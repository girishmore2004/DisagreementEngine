export const LLMConfig = {
  // Model parameters optimized for reasoning
  reasoning: {
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9
  },
  
  // Faster responses for extraction
  extraction: {
    temperature: 0.3,
    maxTokens: 500,
    topP: 0.8
  },
  
  // Creative synthesis
  synthesis: {
    temperature: 0.8,
    maxTokens: 1500,
    topP: 0.95
  },
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    backoffMs: 1000
  }
};