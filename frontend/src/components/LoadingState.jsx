import React from 'react';

export const LoadingState = () => {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <h3>Analyzing your idea...</h3>
        <div className="loading-steps">
          <div className="step">Extracting core claims</div>
          <div className="step">Running logical analysis</div>
          <div className="step">Checking market reality</div>
          <div className="step">Evaluating ethics</div>
          <div className="step">Assessing future risks</div>
          <div className="step">Synthesizing improvements</div>
        </div>
      </div>
    </div>
  );
};