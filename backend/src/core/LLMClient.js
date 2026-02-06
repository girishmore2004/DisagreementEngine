import axios from 'axios';
import { config } from '../config/env.config.js';
import { LLMConfig } from '../config/llm.config.js';
import logger from '../utils/logger.js';

class LLMClient {
  constructor() {
    this.apiKey = config.groq.apiKey;
    this.model = config.groq.model;
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
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature
    };

    try {
      const response = await this._makeRequest(payload);
      return this._extractContent(response);
    } catch (error) {
      logger.error('LLM call failed:', error);
      throw new Error('AI reasoning failed. Please try again.');
    }
  }

  async _makeRequest(payload, attempt = 1) {
    try {
      const response = await axios.post(this.baseURL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return response.data;
    } catch (error) {
      if (attempt < LLMConfig.retry.maxAttempts && this._isRetryable(error)) {
        await this._sleep(LLMConfig.retry.backoffMs * attempt);
        return this._makeRequest(payload, attempt + 1);
      }
      throw error;
    }
  }

  _extractContent(response) {
    if (response.choices && response.choices[0] && response.choices[0].message) {
      return response.choices[0].message.content.trim();
    }
    throw new Error('Invalid response format from LLM');
  }

  _isRetryable(error) {
    const retryableStatuses = [429, 500, 502, 503, 504];
    return error.response && retryableStatuses.includes(error.response.status);
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new LLMClient();