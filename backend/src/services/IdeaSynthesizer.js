import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import { LLMConfig } from '../config/llm.config.js';
import logger from '../utils/logger.js';

class IdeaSynthesizer {
  
  async synthesize(claim, allCritiques) {
    const prompt = PromptEngine.buildSynthesisPrompt(claim, allCritiques);
    
    try {
      const response = await LLMClient.call(prompt, {
        ...LLMConfig.synthesis,
        systemPrompt: 'You are an idea architect. Return only valid JSON.'
      });
      
      const parsed = this._parseJSON(response);
      this._validate(parsed);
      
      logger.info('Synthesis completed successfully');
      return parsed;
      
    } catch (error) {
      logger.error('Synthesis failed:', error);
      throw new Error('Failed to strengthen idea');
    }
  }

  _parseJSON(text) {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in synthesis response');
    }
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }

  _validate(data) {
    if (!data.strengthenedIdea || !data.keyImprovements) {
      throw new Error('Invalid synthesis output');
    }
  }
}

export default new IdeaSynthesizer();