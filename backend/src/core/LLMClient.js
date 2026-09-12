import axios from 'axios';
import { config } from '../config/env.config.js';
import { LLMConfig } from '../config/llm.config.js';
import logger from '../utils/logger.js';

class LLMClient {
  constructor() {
    this.apiKey = config.groq.apiKey;
    this.model = config.groq.model;

    // Groq OpenAI-compatible Chat Completions endpoint
    this.baseURL = 'https://api.groq.com/openai/v1/chat/completions';
  }

  async call(prompt, options = {}) {
    const {
      temperature = LLMConfig.reasoning.temperature,
      maxTokens = LLMConfig.reasoning.maxTokens,
      systemPrompt = null
    } = options;

    const messages = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    messages.push({
      role: 'user',
      content: prompt
    });

    const payload = {
      model: this.model,
      messages,
      max_tokens: maxTokens,
      temperature
    };

    try {
      const response = await this._makeRequest(payload);

      return this._extractContent(response);
    } catch (error) {
      // Never log the complete Axios error object.
      // Axios errors can contain circular/non-serializable objects.
      logger.error('LLM call failed', {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        responseData: error?.response?.data,
        url: error?.config?.url,
        method: error?.config?.method,
        model: this.model
      });

      // Surface a specific, actionable message when the configured
      // model itself is the problem, instead of a generic failure —
      // this is what silently broke when Groq deprecated a model id.
      const groqErrorCode = error?.response?.data?.error?.code;
      const status = error?.response?.status;

      if (status === 404 || groqErrorCode === 'model_not_found') {
        throw new Error(
          `The Groq model "${this.model}" does not exist or is not available on your account. ` +
          `It may have been deprecated/decommissioned. Set GROQ_MODEL to a currently supported ` +
          `model (e.g. "openai/gpt-oss-120b" or "qwen/qwen3.6-27b") and restart the server.`
        );
      }

      if (status === 401) {
        throw new Error('Groq API rejected the request: invalid or missing GROQ_API_KEY.');
      }

      if (status === 429) {
        throw new Error('Groq API rate limit exceeded. Please wait and try again.');
      }

      throw new Error('AI reasoning failed. Please try again.');
    }
  }

  async _makeRequest(payload, attempt = 1) {
    try {
      const response = await axios.post(
        this.baseURL,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          timeout: 60000
        }
      );

      return response.data;
    } catch (error) {
      if (
        attempt < LLMConfig.retry.maxAttempts &&
        this._isRetryable(error)
      ) {
        await this._sleep(
          LLMConfig.retry.backoffMs * attempt
        );

        return this._makeRequest(
          payload,
          attempt + 1
        );
      }

      throw error;
    }
  }

  _extractContent(response) {
    if (
      response &&
      Array.isArray(response.choices) &&
      response.choices.length > 0 &&
      response.choices[0]?.message?.content
    ) {
      return response.choices[0].message.content.trim();
    }

    logger.error('Invalid response format from LLM', {
      responseKeys: response
        ? Object.keys(response)
        : []
    });

    throw new Error('Invalid response format from LLM');
  }

  _isRetryable(error) {
    const retryableStatuses = [
      429,
      500,
      502,
      503,
      504
    ];

    return Boolean(
      error?.response?.status &&
      retryableStatuses.includes(error.response.status)
    );
  }

  _sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}

export default new LLMClient();
