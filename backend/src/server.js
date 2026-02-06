import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config, validateConfig } from './config/env.config.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import analyzeRoutes from './routes/analyze.routes.js';
import logger from './utils/logger.js';

// Validate environment
validateConfig();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://disagreement-engine.vercel.app/',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api', analyzeRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});


// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || config.port || 10000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

export default app;
