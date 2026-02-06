import React from 'react';

export const CritiqueDisplay = ({ result }) => {
  if (!result) return null;

  const { original, analysis, improved, scores } = result;

  const getSeverityClass = (severity) => {
    const classes = {
      low: 'severity-low',
      medium: 'severity-medium',
      high: 'severity-high'
    };
    return classes[severity] || 'severity-medium';
  };

  return (
    <div className="critique-display">
      {/* Original Claim */}
      <section className="section original-section">
        <h2 className="section-title">Your Original Idea</h2>
        <div className="claim-box">
          <p className="claim-text">{original.claim}</p>
          <div className="meta-info">
            <span className="meta-badge">Domain: {original.domain}</span>
            <span className="meta-badge">Confidence: {original.confidence}</span>
          </div>
        </div>
      </section>

      {/* Analysis */}
      <section className="section analysis-section">
        <h2 className="section-title">Critical Analysis</h2>

        {/* Logic */}
        {analysis.logic?.length > 0 && (
          <div className="critique-category">
            <h3 className="category-title">🧠 Logical Soundness</h3>
            <div className="critique-list">
              {analysis.logic.map((item, idx) => (
                <div key={idx} className={`critique-item ${getSeverityClass(item.severity)}`}>
                  <div className="critique-header">
                    <span className="critique-type">{item.type}</span>
                    <span className="severity-badge">{item.severity}</span>
                  </div>
                  <p className="critique-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market */}
        {analysis.market?.length > 0 && (
          <div className="critique-category">
            <h3 className="category-title">📊 Market Reality</h3>
            <div className="critique-list">
              {analysis.market.map((item, idx) => (
                <div key={idx} className={`critique-item ${getSeverityClass(item.severity)}`}>
                  <div className="critique-header">
                    <span className="critique-type">{item.aspect}</span>
                    <span className="severity-badge">{item.severity}</span>
                  </div>
                  <p className="critique-text">{item.concern}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ethics */}
        {analysis.ethics?.length > 0 && (
          <div className="critique-category">
            <h3 className="category-title">⚖️ Ethical Considerations</h3>
            <div className="critique-list">
              {analysis.ethics.map((item, idx) => (
                <div key={idx} className={`critique-item ${getSeverityClass(item.severity)}`}>
                  <div className="critique-header">
                    <span className="critique-type">{item.dimension}</span>
                    <span className="severity-badge">{item.severity}</span>
                  </div>
                  <p className="critique-text">{item.concern}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future */}
        {analysis.future?.length > 0 && (
          <div className="critique-category">
            <h3 className="category-title">🔮 Future Risks</h3>
            <div className="critique-list">
              {analysis.future.map((item, idx) => (
                <div key={idx} className={`critique-item ${getSeverityClass(item.severity)}`}>
                  <div className="critique-header">
                    <span className="critique-type">{item.timeframe}</span>
                    <span className="severity-badge">{item.severity}</span>
                  </div>
                  <p className="critique-text">{item.risk}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Improved Version */}
      <section className="section improved-section">
        <h2 className="section-title">✨ Strengthened Version</h2>
        <div className="improved-box">
          <p className="improved-text">{improved.strengthenedIdea}</p>
          
          {improved.keyImprovements?.length > 0 && (
            <div className="improvements">
              <h4 className="improvements-title">Key Improvements:</h4>
              <ul className="improvements-list">
                {improved.keyImprovements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          )}

          {improved.remainingRisks?.length > 0 && (
            <div className="remaining-risks">
              <h4 className="risks-title">Remaining Considerations:</h4>
              <ul className="risks-list">
                {improved.remainingRisks.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};