import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import logger from '../utils/logger.js';

class FutureCritic {
  
  async critique(claim, domain, challengeLevel) {
    const prompt = PromptEngine.buildFutureCriticPrompt(claim, domain, challengeLevel);
    
    try {
      const response = await LLMClient.call(prompt, {
        systemPrompt: 'You are a futures analyst. Return only valid JSON.'
      });
      
      const parsed = this._parseJSON(response);
      logger.info(`Future critique completed: ${parsed.critiques?.length || 0} risks identified`);
      
      return parsed.critiques || [];
      
    } catch (error) {
      logger.error('Future critique failed:', error);
      return [];
    }
  }

  _parseJSON(text) {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { critiques: [] };
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }
}

export default new FutureCritic();