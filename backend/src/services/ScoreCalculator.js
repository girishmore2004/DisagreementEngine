class ScoreCalculator {
  
  calculate(originalData, synthesis, critiques) {
    const originalScore = this._scoreOriginal(originalData, critiques);
    const improvedScore = this._scoreImproved(synthesis, critiques);
    
    return {
      original: originalScore,
      improved: improvedScore,
      improvement: improvedScore - originalScore,
      dimensions: {
        clarity: this._scoreClarity(originalData, synthesis),
        riskAwareness: this._scoreRiskAwareness(originalData, synthesis, critiques),
        logicalSoundness: this._scoreLogic(critiques)
      }
    };
  }

  _scoreOriginal(data, critiques) {
    let score = 50; // Base score
    
    // Deduct for confidence without evidence
    if (data.confidence === 'high' && this._totalCritiques(critiques) > 5) {
      score -= 15;
    }
    
    // Deduct for critical flaws
    const criticalIssues = this._countCriticalIssues(critiques);
    score -= criticalIssues * 5;
    
    return Math.max(0, Math.min(100, score));
  }

  _scoreImproved(synthesis, critiques) {
    let score = 70; // Start higher for improved version
    
    // Bonus for addressing concerns
    const improvementsCount = synthesis.keyImprovements?.length || 0;
    score += improvementsCount * 5;
    
    // Deduct for remaining risks
    const remainingRisks = synthesis.remainingRisks?.length || 0;
    score -= remainingRisks * 3;
    
    return Math.max(0, Math.min(100, score));
  }

  _scoreClarity(original, synthesis) {
    const originalLength = original.mainClaim?.length || 0;
    const improvedLength = synthesis.strengthenedIdea?.length || 0;
    
    // Penalize if too vague (too short) or too complex (too long)
    const optimalLength = 100;
    const originalDiff = Math.abs(originalLength - optimalLength);
    const improvedDiff = Math.abs(improvedLength - optimalLength);
    
    const originalScore = Math.max(0, 100 - originalDiff / 2);
    const improvedScore = Math.max(0, 100 - improvedDiff / 2);
    
    return {
      original: Math.round(originalScore),
      improved: Math.round(improvedScore)
    };
  }

  _scoreRiskAwareness(original, synthesis, critiques) {
    const totalRisks = this._totalCritiques(critiques);
    const acknowledgedRisks = synthesis.remainingRisks?.length || 0;
    
    const originalScore = 30; // Original didn't acknowledge risks
    const improvedScore = Math.min(100, 50 + (acknowledgedRisks * 10));
    
    return {
      original: originalScore,
      improved: improvedScore
    };
  }

  _scoreLogic(critiques) {
    const logicIssues = critiques.logic?.length || 0;
    const criticalLogicIssues = critiques.logic?.filter(c => c.severity === 'high').length || 0;
    
    const score = Math.max(0, 100 - (logicIssues * 10) - (criticalLogicIssues * 20));
    
    return Math.round(score);
  }

  _totalCritiques(critiques) {
    return (
      (critiques.logic?.length || 0) +
      (critiques.market?.length || 0) +
      (critiques.ethics?.length || 0) +
      (critiques.future?.length || 0)
    );
  }

  _countCriticalIssues(critiques) {
    let count = 0;
    
    ['logic', 'market', 'ethics', 'future'].forEach(category => {
      if (critiques[category]) {
        count += critiques[category].filter(c => c.severity === 'high').length;
      }
    });
    
    return count;
  }
}

export default new ScoreCalculator();