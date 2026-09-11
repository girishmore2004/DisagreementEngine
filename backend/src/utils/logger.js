import winston from 'winston';
import { config } from '../config/env.config.js';

/**
 * Safely converts an object to JSON.
 *
 * Some Node.js / Axios objects contain circular references.
 * Example:
 *
 * ClientRequest
 *   -> res
 *   -> req
 *   -> ClientRequest
 *
 * JSON.stringify() cannot serialize such structures.
 *
 * This function prevents the logger itself from throwing
 * an exception when an error contains such objects.
 */
const safeStringify = (value) => {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return '[Circular or non-serializable object]';
  }
};

const logger = winston.createLogger({
  level: config.logging.level,

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),

        winston.format.printf(
          ({ timestamp, level, message, ...meta }) => {
            const additionalData =
              Object.keys(meta).length > 0
                ? safeStringify(meta)
                : '';

            return `${timestamp} [${level}]: ${message} ${additionalData}`;
          }
        )
      )
    })
  ]
});

export default logger;
