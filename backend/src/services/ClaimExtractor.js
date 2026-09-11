import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import { LLMConfig } from '../config/llm.config.js';
import logger from '../utils/logger.js';

class ClaimExtractor {

  /**
   * Extract the main claim, assumptions, confidence,
   * and domain from the user's input.
   *
   * The extraction logic itself is unchanged.
   */
  async extract(userInput) {
    const prompt = PromptEngine.buildClaimExtractionPrompt(userInput);

    try {
      const response = await LLMClient.call(prompt, {
        ...LLMConfig.extraction,
        systemPrompt:
          'You are a precise analytical engine. Return only valid JSON.'
      });

      const parsed = this._parseJSON(response);

      this._validate(parsed);

      logger.info('Claim extracted successfully');

      return parsed;

    } catch (error) {
      /**
       * Do not pass the complete Axios/HTTP error object
       * directly to the logger.
       *
       * Axios errors can contain circular references such as:
       *
       * error.request
       *   -> ClientRequest
       *   -> response
       *   -> request
       *   -> ClientRequest
       *
       * We only log useful, serializable information.
       */
      logger.error('Claim extraction failed', {
        message: error?.message,
        name: error?.name,
        code: error?.code,
        status: error?.response?.status,
        responseData: error?.response?.data,
        stack: error?.stack
      });

      /**
       * Preserve the original error as the cause while
       * maintaining your existing public error message.
       *
       * This does NOT change the application's control flow.
       */
      throw new Error(
        `Failed to analyze input structure: ${error?.message || 'Unknown error'}`,
        {
          cause: error
        }
      );
    }
  }

  /**
   * Parse JSON returned by the LLM.
   *
   * Supports:
   * 1. Normal JSON
   * 2. JSON wrapped inside ```json ... ```
   * 3. JSON embedded inside surrounding text
   */
  _parseJSON(text) {
    const jsonMatch =
      text.match(/```json\s*([\s\S]*?)\s*```/) ||
      text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];

    return JSON.parse(jsonText);
  }

  /**
   * Validate the extracted claim structure.
   */
  _validate(data) {
    const required = [
      'mainClaim',
      'assumptions',
      'confidence',
      'domain'
    ];

    const missing = required.filter(
      (key) => !data[key]
    );

    if (missing.length > 0) {
      throw new Error(
        `Invalid extraction: missing ${missing.join(', ')}`
      );
    }

    if (!Array.isArray(data.assumptions)) {
      throw new Error(
        'Assumptions must be an array'
      );
    }
  }
}

export default new ClaimExtractor();
