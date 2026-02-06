import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import logger from '../utils/logger.js';

class LogicCritic {
  
  async critique(claim, assumptions, challengeLevel) {
    const prompt = PromptEngine.buildLogicCriticPrompt(claim, assumptions, challengeLevel);
    
    try {
      const response = await LLMClient.call(prompt, {
        systemPrompt: 'You are a formal logic expert. Return only valid JSON.'
      });
      
      const parsed = this._parseJSON(response);
      logger.info(`Logic critique completed: ${parsed.critiques?.length || 0} issues found`);
      
      return parsed.critiques || [];
      
    } catch (error) {
      logger.error('Logic critique failed:', error);
      return []; // Graceful degradation
    }
  }

  _parseJSON(text) {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { critiques: [] };
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }
}

export default new LogicCritic();