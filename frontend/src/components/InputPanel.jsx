import React, { useState } from 'react';

export const InputPanel = ({ onAnalyze, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  const exampleIdeas = [
    "Our college app will succeed because students need it",
    "AI will replace all software engineers within 5 years",
    "Making our product free will help us capture market share"
  ];

  const useExample = (example) => {
    setInput(example);
  };

  return (
    <div className="input-panel">
      <form onSubmit={handleSubmit} className="input-form">
        <label htmlFor="idea-input" className="input-label">
          Your Idea or Claim
        </label>
        <textarea
          id="idea-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your startup idea, business hypothesis, or any claim you want challenged... (e.g., 'Our AI-powered education platform will disrupt traditional universities')"
          className="input-textarea"
          rows={5}
          disabled={loading}
        />

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Analyzing Your Idea...' : 'Analyze My Idea'}
        </button>
      </form>

      <div className="examples">
        <p className="examples-label">Quick Start Examples</p>
        <div className="examples-grid">
          {exampleIdeas.map((example, idx) => (
            <button
              key={idx}
              onClick={() => useExample(example)}
              className="example-button"
              disabled={loading}
            >
              <span>{example}</span>
              <span className="example-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};