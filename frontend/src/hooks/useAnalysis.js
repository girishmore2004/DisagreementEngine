import { useState } from 'react';
import { analyzeIdea } from '../services/api';

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = async (userInput, challengeLevel) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeIdea(userInput, challengeLevel);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    analyze,
    reset
  };
};