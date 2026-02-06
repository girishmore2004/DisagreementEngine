import React from 'react';

export const ComparisonScore = ({ scores }) => {
  if (!scores) return null;

  const { original, improved, improvement, dimensions } = scores;

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-excellent';
    if (score >= 60) return 'score-good';
    if (score >= 40) return 'score-fair';
    return 'score-poor';
  };

  return (
    <div className="comparison-score">
      <h2 className="score-title">Comparison Analysis</h2>

      <div className="score-cards">
        <div className="score-card">
          <div className="score-label">Original</div>
          <div className={`score-value ${getScoreClass(original)}`}>
            {original}
          </div>
        </div>

        <div className="score-arrow">
          {improvement > 0 ? '→' : ''}
        </div>

        <div className="score-card">
          <div className="score-label">Improved</div>
          <div className={`score-value ${getScoreClass(improved)}`}>
            {improved}
          </div>
        </div>
      </div>

      {improvement > 0 && (
        <div className="improvement-badge">
          +{improvement} points improvement
        </div>
      )}

      <div className="dimensions">
        <h3 className="dimensions-title">Dimension Scores</h3>
        
        {dimensions.clarity && (
          <div className="dimension">
            <span className="dimension-label">Clarity</span>
            <div className="dimension-bars">
              <div className="dimension-bar">
                <div 
                  className="dimension-fill original-fill" 
                  style={{width: `${dimensions.clarity.original}%`}}
                />
              </div>
              <div className="dimension-bar">
                <div 
                  className="dimension-fill improved-fill" 
                  style={{width: `${dimensions.clarity.improved}%`}}
                />
              </div>
            </div>
          </div>
        )}

        {dimensions.riskAwareness && (
          <div className="dimension">
            <span className="dimension-label">Risk Awareness</span>
            <div className="dimension-bars">
              <div className="dimension-bar">
                <div 
                  className="dimension-fill original-fill" 
                  style={{width: `${dimensions.riskAwareness.original}%`}}
                />
              </div>
              <div className="dimension-bar">
                <div 
                  className="dimension-fill improved-fill" 
                  style={{width: `${dimensions.riskAwareness.improved}%`}}
                />
              </div>
            </div>
          </div>
        )}

        {dimensions.logicalSoundness !== undefined && (
          <div className="dimension">
            <span className="dimension-label">Logical Soundness</span>
            <div className="dimension-bar-single">
              <div 
                className="dimension-fill logic-fill" 
                style={{width: `${dimensions.logicalSoundness}%`}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};