import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Don't leak error details in production
  const isDev = process.env.NODE_ENV === 'development';

  res.status(err.statusCode || 500).json({
    success: false,
    error: isDev ? err.message : 'An error occurred while processing your request',
    ...(isDev && { stack: err.stack })
  });
};