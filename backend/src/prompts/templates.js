export const PromptTemplates = {
  
  CLAIM_EXTRACTION: `You are a precise analytical engine. Extract the core claim and assumptions from this input.

Input: "{input}"

Analyze and return ONLY valid JSON in this exact format:
{
  "mainClaim": "single sentence core assertion",
  "assumptions": ["assumption 1", "assumption 2", "assumption 3"],
  "confidence": "low|medium|high",
  "domain": "category (e.g., business, technology, education)"
}

Be ruthlessly precise. No commentary. JSON only.`,

  LOGIC_CRITIC: `You are a logic expert. Find logical flaws in this claim using formal reasoning principles.

Claim: "{claim}"
Assumptions: {assumptions}

Challenge Mode: {challengeLevel}

Identify logical fallacies, unsupported leaps, circular reasoning, or invalid inferences.

Return ONLY valid JSON:
{
  "critiques": [
    {
      "type": "fallacy type",
      "explanation": "why this is flawed",
      "severity": "low|medium|high"
    }
  ]
}

Be {tone}. Focus on reasoning structure, not opinions.`,

  MARKET_CRITIC: `You are a market reality analyst. Test this idea against real-world constraints.

Claim: "{claim}"
Domain: {domain}

Challenge Mode: {challengeLevel}

Consider: competition, demand, execution difficulty, resource requirements, timing.

Return ONLY valid JSON:
{
  "critiques": [
    {
      "aspect": "market factor",
      "concern": "specific issue",
      "severity": "low|medium|high"
    }
  ]
}

Be {tone}. Cite real-world patterns where possible.`,

  ETHICS_CRITIC: `You are an ethics consultant. Identify potential ethical concerns or unintended consequences.

Claim: "{claim}"
Domain: {domain}

Challenge Mode: {challengeLevel}

Consider: fairness, privacy, bias, stakeholder impact, long-term consequences.

Return ONLY valid JSON:
{
  "critiques": [
    {
      "dimension": "ethical dimension",
      "concern": "specific issue",
      "severity": "low|medium|high"
    }
  ]
}

Be {tone}. Focus on blind spots, not obvious issues.`,

  FUTURE_CRITIC: `You are a futures analyst. Identify how this idea might fail or become obsolete over time.

Claim: "{claim}"
Domain: {domain}

Challenge Mode: {challengeLevel}

Consider: technological shifts, changing behavior, regulatory changes, scalability limits.

Return ONLY valid JSON:
{
  "critiques": [
    {
      "timeframe": "short-term|medium-term|long-term",
      "risk": "specific future risk",
      "severity": "low|medium|high"
    }
  ]
}

Be {tone}. Think 5+ years ahead.`,

  SYNTHESIS: `You are an idea architect. Take the original idea and all critiques, then rebuild it stronger.

Original Claim: "{claim}"

Critiques Summary:
{critiques}

Your task:
1. Acknowledge valid concerns
2. Adjust the idea to address them
3. Make it more robust, realistic, and defensible

Return ONLY valid JSON:
{
  "strengthenedIdea": "improved version of the idea",
  "keyImprovements": ["improvement 1", "improvement 2", "improvement 3"],
  "remainingRisks": ["risk 1", "risk 2"]
}

Be constructive. The goal is to help, not destroy.`
};

export const getTone = (challengeLevel) => {
  return challengeLevel === 'strong' 
    ? 'direct and rigorous' 
    : 'respectful but thorough';
};