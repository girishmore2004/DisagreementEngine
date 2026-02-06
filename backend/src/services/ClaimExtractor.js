import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import { LLMConfig } from '../config/llm.config.js';
import logger from '../utils/logger.js';

class ClaimExtractor {
  
  async extract(userInput) {
    const prompt = PromptEngine.buildClaimExtractionPrompt(userInput);
    
    try {
      const response = await LLMClient.call(prompt, {
        ...LLMConfig.extraction,
        systemPrompt: 'You are a precise analytical engine. Return only valid JSON.'
      });
      
      const parsed = this._parseJSON(response);
      this._validate(parsed);
      
      logger.info('Claim extracted successfully');
      return parsed;
      
    } catch (error) {
      logger.error('Claim extraction failed:', error);
      throw new Error('Failed to analyze input structure');
    }
  }

  _parseJSON(text) {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }

  _validate(data) {
    const required = ['mainClaim', 'assumptions', 'confidence', 'domain'];
    const missing = required.filter(key => !data[key]);
    
    if (missing.length > 0) {
      throw new Error(`Invalid extraction: missing ${missing.join(', ')}`);
    }
    
    if (!Array.isArray(data.assumptions)) {
      throw new Error('Assumptions must be an array');
    }
  }
}

export default new ClaimExtractor();