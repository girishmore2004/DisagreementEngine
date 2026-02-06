import { PromptTemplates, getTone } from '../prompts/templates.js';

class PromptEngine {
  
  buildClaimExtractionPrompt(userInput) {
    return PromptTemplates.CLAIM_EXTRACTION
      .replace('{input}', userInput);
  }

  buildLogicCriticPrompt(claim, assumptions, challengeLevel) {
    return PromptTemplates.LOGIC_CRITIC
      .replace('{claim}', claim)
      .replace('{assumptions}', JSON.stringify(assumptions))
      .replace('{challengeLevel}', challengeLevel)
      .replace('{tone}', getTone(challengeLevel));
  }

  buildMarketCriticPrompt(claim, domain, challengeLevel) {
    return PromptTemplates.MARKET_CRITIC
      .replace('{claim}', claim)
      .replace('{domain}', domain)
      .replace('{challengeLevel}', challengeLevel)
      .replace('{tone}', getTone(challengeLevel));
  }

  buildEthicsCriticPrompt(claim, domain, challengeLevel) {
    return PromptTemplates.ETHICS_CRITIC
      .replace('{claim}', claim)
      .replace('{domain}', domain)
      .replace('{challengeLevel}', challengeLevel)
      .replace('{tone}', getTone(challengeLevel));
  }

  buildFutureCriticPrompt(claim, domain, challengeLevel) {
    return PromptTemplates.FUTURE_CRITIC
      .replace('{claim}', claim)
      .replace('{domain}', domain)
      .replace('{challengeLevel}', challengeLevel)
      .replace('{tone}', getTone(challengeLevel));
  }

  buildSynthesisPrompt(claim, allCritiques) {
    const critiqueSummary = this._formatCritiquesForSynthesis(allCritiques);
    
    return PromptTemplates.SYNTHESIS
      .replace('{claim}', claim)
      .replace('{critiques}', critiqueSummary);
  }

  _formatCritiquesForSynthesis(critiques) {
    const sections = [];
    
    if (critiques.logic?.length) {
      sections.push(`Logic: ${critiques.logic.map(c => c.explanation).join('; ')}`);
    }
    if (critiques.market?.length) {
      sections.push(`Market: ${critiques.market.map(c => c.concern).join('; ')}`);
    }
    if (critiques.ethics?.length) {
      sections.push(`Ethics: ${critiques.ethics.map(c => c.concern).join('; ')}`);
    }
    if (critiques.future?.length) {
      sections.push(`Future: ${critiques.future.map(c => c.risk).join('; ')}`);
    }
    
    return sections.join('\n');
  }
}

export default new PromptEngine();