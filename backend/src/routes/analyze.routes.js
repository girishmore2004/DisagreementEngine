import express from 'express';
import ReasoningPipeline from '../core/ReasoningPipeline.js';
import { validateAnalysisRequest } from '../middleware/validator.js';
import { formatSuccess, formatError } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/analyze', validateAnalysisRequest, async (req, res, next) => {
  const { userInput, challengeLevel } = req.validatedData;
  
  try {
    logger.info('Analysis request received', { challengeLevel });
    
    const result = await ReasoningPipeline.execute(userInput, challengeLevel);
    
    res.json(formatSuccess(result, 'Analysis completed'));
    
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;