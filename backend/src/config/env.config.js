import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV || 'development',

  groq: {
    apiKey: process.env.GROQ_API_KEY,

    // llama-3.3-70b-versatile was deprecated/decommissioned by Groq on
    // 2026-08-16. Default now points to Groq's recommended replacement.
    // Override via GROQ_MODEL if you want e.g. 'qwen/qwen3.6-27b' or
    // 'openai/gpt-oss-20b' (faster, smaller).
    model:
      process.env.GROQ_MODEL ||
      'openai/gpt-oss-120b',

    maxTokens: 4000,

    temperature: 0.7
  },

  rateLimit: {
    windowMs:
      parseInt(
        process.env.RATE_LIMIT_WINDOW_MS,
        10
      ) || 900000,

    max:
      parseInt(
        process.env.RATE_LIMIT_MAX_REQUESTS,
        10
      ) || 100
  },

  logging: {
    level:
      process.env.LOG_LEVEL || 'info'
  }
};

export const validateConfig = () => {
  const required = [
    'GROQ_API_KEY'
  ];

  const missing = required.filter(
    key => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }

  if (!config.groq.apiKey) {
    throw new Error(
      'GROQ_API_KEY is not configured'
    );
  }

  if (!config.groq.model) {
    throw new Error(
      'GROQ_MODEL is not configured'
    );
  }
};
