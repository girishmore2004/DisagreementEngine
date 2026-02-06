import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://disagreementengine.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', message);
    throw new Error(message);
  }
);

export const analyzeIdea = async (userInput, challengeLevel) => {
  return apiClient.post('/analyze', {
    userInput,
    challengeLevel
  });
};

export const checkHealth = async () => {
  return apiClient.get('/health');
};
