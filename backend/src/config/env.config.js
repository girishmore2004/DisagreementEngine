import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV || 'development',

  groq: {
    apiKey: process.env.GROQ_API_KEY,

    model:
      process.env.GROQ_MODEL ||
      'llama-3.3-70b-versatile',

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
