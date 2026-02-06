import ClaimExtractor from '../services/ClaimExtractor.js';
import LogicCritic from '../services/LogicCritic.js';
import MarketCritic from '../services/MarketCritic.js';
import EthicsCritic from '../services/EthicsCritic.js';
import FutureCritic from '../services/FutureCritic.js';
import IdeaSynthesizer from '../services/IdeaSynthesizer.js';
import ScoreCalculator from '../services/ScoreCalculator.js';
import logger from '../utils/logger.js';

class ReasoningPipeline {
  
  async execute(userInput, challengeLevel = 'soft') {
    const startTime = Date.now();
    
    try {
      // Step 1: Extract claim and assumptions
      logger.info('Starting claim extraction...');
      const extraction = await ClaimExtractor.extract(userInput);
      
      const { mainClaim, assumptions, domain } = extraction;
      
      // Step 2: Run parallel critiques
      logger.info('Running critics...');
      const [logicCritiques, marketCritiques, ethicsCritiques, futureCritiques] = 
        await Promise.all([
          LogicCritic.critique(mainClaim, assumptions, challengeLevel),
          MarketCritic.critique(mainClaim, domain, challengeLevel),
          EthicsCritic.critique(mainClaim, domain, challengeLevel),
          FutureCritic.critique(mainClaim, domain, challengeLevel)
        ]);
      
      const allCritiques = {
        logic: logicCritiques,
        market: marketCritiques,
        ethics: ethicsCritiques,
        future: futureCritiques
      };
      
      // Step 3: Synthesize improved idea
      logger.info('Synthesizing improved idea...');
      const synthesis = await IdeaSynthesizer.synthesize(mainClaim, allCritiques);
      
      // Step 4: Calculate scores
      const scores = ScoreCalculator.calculate(extraction, synthesis, allCritiques);
      
      const executionTime = Date.now() - startTime;
      logger.info(`Pipeline completed in ${executionTime}ms`);
      
      return {
        original: {
          claim: mainClaim,
          assumptions,
          confidence: extraction.confidence,
          domain
        },
        analysis: allCritiques,
        improved: synthesis,
        scores,
        meta: {
          executionTimeMs: executionTime,
          challengeLevel
        }
      };
      
    } catch (error) {
      logger.error('Pipeline execution failed:', error);
      throw error;
    }
  }
}

export default new ReasoningPipeline();