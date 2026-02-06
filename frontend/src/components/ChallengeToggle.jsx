import React from 'react';

export const ChallengeToggle = ({ level, onChange, disabled }) => {
  return (
    <div className="challenge-toggle">
      <label className="toggle-label">Challenge Level:</label>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${level === 'soft' ? 'active' : ''}`}
          onClick={() => onChange('soft')}
          disabled={disabled}
        >
          Respectful
        </button>
        <button
          className={`toggle-button ${level === 'strong' ? 'active' : ''}`}
          onClick={() => onChange('strong')}
          disabled={disabled}
        >
          Rigorous
        </button>
      </div>
    </div>
  );
};