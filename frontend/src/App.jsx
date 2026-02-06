import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { ChallengeToggle } from './components/ChallengeToggle';
import { CritiqueDisplay } from './components/CritiqueDisplay';
import { ComparisonScore } from './components/ComparisonScore';
import { LoadingState } from './components/LoadingState';
import { useAnalysis } from './hooks/useAnalysis';

function App() {
  const [challengeLevel, setChallengeLevel] = useState('soft');
  const { loading, result, error, analyze, reset } = useAnalysis();

  const handleAnalyze = (userInput) => {
    analyze(userInput, challengeLevel);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="app">
      <div className="container">
        {/* Hero Header - First Impression */}
        {!loading && !result && (
          <header className="app-header">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Critical Analysis
            </div>
            <h1 className="title">
              Test Your Ideas <br />
              <span className="title-gradient">Against Reality</span>
            </h1>
            <p className="subtitle">
              Get constructive criticism from specialized AI reasoning engines.
              Strengthen your ideas before you build.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Logic Analysis
              </div>
              <div className="feature-item">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Market Reality
              </div>
              <div className="feature-item">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Future Risks
              </div>
            </div>
          </header>
        )}

        {!result && !loading && (
          <>
            <ChallengeToggle
              level={challengeLevel}
              onChange={setChallengeLevel}
              disabled={loading}
            />
            <InputPanel onAnalyze={handleAnalyze} loading={loading} />
          </>
        )}

        {loading && <LoadingState />}

        {error && (
          <div className="error-message">
            <h3>Analysis Failed</h3>
            <p>{error}</p>
            <button onClick={handleReset} className="reset-button">
              Try Again
            </button>
          </div>
        )}

        {result && !loading && (
          <>
            <button onClick={handleReset} className="back-button">
              ← Analyze Another Idea
            </button>
            <CritiqueDisplay result={result} />
            <ComparisonScore scores={result.scores} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;