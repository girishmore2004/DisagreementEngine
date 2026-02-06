# 🧠 AI Disagreement Engine

**Intelligent Idea Validation Through Adversarial AI Reasoning**

🌐 **Live Demo:** https://ai-disagreement-engine.vercel.app  


[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com/) 

> **Transform ideas into stronger solutions through systematic AI-powered critical analysis.**

A production-ready web application that validates business ideas, research proposals, and strategic decisions using parallel AI reasoning critics specializing in logic, market reality, ethics, and future risks.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution Architecture](#-solution-architecture)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Usage Examples](#-usage-examples)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing) 
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

The **AI Disagreement Engine** is a web-based reasoning platform that helps entrepreneurs, students, and decision-makers validate ideas through systematic adversarial analysis. Unlike traditional AI chatbots that agree and assist, this system **actively challenges** your ideas to identify blind spots before costly execution.

### Why This Matters

- **42%** of startups fail due to no market need
- **29%** run out of cash due to poor planning
- **90%** of startups fail within the first year

**The root cause:** Ideas are rarely stress-tested against reality before execution.

### What Makes This Different

- ✅ **Adversarial by Design** - AI critics trained to find flaws, not validate
- ✅ **Multi-Dimensional Analysis** - Logic, Market, Ethics, Future in parallel
- ✅ **Constructive Synthesis** - Rebuilds stronger versions of your idea
- ✅ **Quantified Improvement** - Measurable before/after scoring
- ✅ **Production-Ready** - Polished UI, robust backend, scalable architecture

---

## 🔍 Problem Statement

### Current Gaps in Idea Validation

| Problem | Impact | Our Solution |
|---------|--------|--------------|
| **Echo Chambers** | Founders seek validation, not critique | Adversarial AI with no social bias |
| **Expensive Advisors** | $200-500/hour for expert feedback | $0.01/analysis with instant results |
| **Single-Dimensional** | Focus on feasibility, ignore ethics/logic | 4 parallel specialized critics |
| **Delayed Feedback** | Validation after months of work | 10-15 second comprehensive analysis |
| **Generic AI Tools** | Conversational, not systematically critical | Structured reasoning pipeline |

---

## 🏗️ Solution Architecture

### System Design
```
User Input → Claim Extraction → Parallel Critics → Synthesis → Scoring → Results
                                      ↓
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
              Logic Critic      Market Critic    Ethics Critic
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      ↓
                               Future Critic
```

### Pipeline Stages

1. **Claim Extraction** (0.5s)
   - Identifies core assertion
   - Extracts assumptions
   - Determines domain & confidence level

2. **Parallel Critique** (8-12s)
   - **Logic Critic**: Fallacies, circular reasoning, unsupported leaps
   - **Market Critic**: Competition, demand, execution barriers
   - **Ethics Critic**: Fairness, privacy, stakeholder impact
   - **Future Critic**: Tech shifts, scalability limits, obsolescence risks

3. **Synthesis** (2-3s)
   - Addresses identified concerns
   - Rebuilds stronger version
   - Lists key improvements & remaining risks

4. **Scoring** (0.5s)
   - Clarity comparison
   - Risk awareness delta
   - Logical soundness rating

**Total Time:** 10-15 seconds

---

## ✨ Key Features

### For Users

- 🎯 **Instant Validation** - Get expert-level critique in seconds
- 🔄 **Two Challenge Modes** - Respectful or Rigorous analysis
- 📊 **Visual Scoring** - See measurable improvement metrics
- 💡 **Quick Examples** - Pre-loaded ideas to test the system
- 📱 **Fully Responsive** - Works on desktop, tablet, mobile
- ♿ **Accessible** - WCAG 2.1 AA compliant

### For Developers

- 🧩 **Modular Architecture** - Clean separation of concerns
- 🔧 **Extensible Prompt System** - Easy to add new critics
- 📈 **Scalable Design** - Handles concurrent requests
- 🛡️ **Robust Error Handling** - Graceful degradation
- 📝 **Comprehensive Logging** - Winston-based tracking
- 🔒 **Rate Limiting** - Prevents abuse

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Styling:** Custom CSS with Design System
- **HTTP Client:** Axios 1.6.2
- **State Management:** React Hooks

### Backend

- **Runtime:** Node.js 22.x
- **Framework:** Express 4.18.2
- **Validation:** Joi 17.11.0
- **Logging:** Winston 3.11.0
- **Security:** Helmet 7.1.0, CORS 2.8.5
- **Rate Limiting:** Express-rate-limit 7.1.5

### AI & APIs

- **LLM Provider:** Groq (Free Tier)
- **Model:** Llama 3.3 70B Versatile
- **API Client:** Axios with retry logic
- **Prompt Engineering:** Custom template system

### Development

- **Package Manager:** npm
- **Environment:** dotenv 16.3.1
- **Dev Server:** Nodemon 3.0.2
- **Code Quality:** ESM modules

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Groq API Key** (Free - [Get it here](https://console.groq.com/))

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-disagreement-engine.git
cd ai-disagreement-engine
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```env
PORT=5000
NODE_ENV=development

# Groq API (Get from https://console.groq.com/)
GROQ_API_KEY=gsk_your_actual_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
[nodemon] starting `node src/server.js`
2024-XX-XX XX:XX:XX [info]: Server running on port 5000
2024-XX-XX XX:XX:XX [info]: Environment: development
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

#### 5. Open Your Browser

Navigate to: **http://localhost:5173**

---

## 📁 Project Structure
```
ai-disagreement-engine/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.config.js          # Environment configuration
│   │   │   └── llm.config.js          # LLM parameters (temperature, tokens)
│   │   ├── core/
│   │   │   ├── LLMClient.js           # Groq API client with retry logic
│   │   │   ├── PromptEngine.js        # Prompt template builder
│   │   │   └── ReasoningPipeline.js   # Main orchestration logic
│   │   ├── services/
│   │   │   ├── ClaimExtractor.js      # Extract core claims
│   │   │   ├── LogicCritic.js         # Identify logical flaws
│   │   │   ├── MarketCritic.js        # Test market reality
│   │   │   ├── EthicsCritic.js        # Evaluate ethics
│   │   │   ├── FutureCritic.js        # Assess future risks
│   │   │   ├── IdeaSynthesizer.js     # Rebuild stronger ideas
│   │   │   └── ScoreCalculator.js     # Calculate improvement metrics
│   │   ├── prompts/
│   │   │   └── templates.js           # Specialized prompt templates
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Global error handling
│   │   │   ├── validator.js           # Request validation (Joi)
│   │   │   └── rateLimiter.js         # Rate limiting config
│   │   ├── routes/
│   │   │   └── analyze.routes.js      # API endpoints
│   │   ├── utils/
│   │   │   ├── logger.js              # Winston logger
│   │   │   └── responseFormatter.js   # Standardized responses
│   │   └── server.js                  # Express server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputPanel.jsx         # Idea input form
│   │   │   ├── ChallengeToggle.jsx    # Rigor level selector
│   │   │   ├── CritiqueDisplay.jsx    # Results visualization
│   │   │   ├── ComparisonScore.jsx    # Before/after scoring
│   │   │   └── LoadingState.jsx       # Loading animation
│   │   ├── services/
│   │   │   └── api.js                 # Axios API client
│   │   ├── hooks/
│   │   │   └── useAnalysis.js         # Analysis state management
│   │   ├── styles/
│   │   │   └── main.css               # Complete design system
│   │   ├── App.jsx                    # Main application component
│   │   └── main.jsx                   # React entry point
│   ├── index.html
│   ├── package.json
│   └── .env
└── README.md
```

---

## ⚙️ How It Works

### User Journey

1. **Input Idea**
```
   User enters: "Our AI tutoring app will replace traditional teachers"
   Selects challenge level: Rigorous
```

2. **Claim Extraction**
```json
   {
     "mainClaim": "AI tutoring app will replace traditional teachers",
     "assumptions": [
       "AI can handle all teaching functions",
       "Students prefer AI over human interaction",
       "Teachers' jobs are purely knowledge transfer"
     ],
     "confidence": "high",
     "domain": "education"
   }
```

3. **Parallel Critique** (runs simultaneously)

   **Logic Critic:**
```json
   {
     "critiques": [
       {
         "type": "False Dichotomy",
         "explanation": "Assumes replacement rather than augmentation",
         "severity": "high"
       }
     ]
   }
```

   **Market Critic:**
```json
   {
     "critiques": [
       {
         "aspect": "Regulatory Barriers",
         "concern": "Teacher certification laws in most countries",
         "severity": "high"
       }
     ]
   }
```

   **Ethics Critic:**
```json
   {
     "critiques": [
       {
         "dimension": "Employment Impact",
         "concern": "Displaces millions of teaching jobs",
         "severity": "high"
       }
     ]
   }
```

   **Future Critic:**
```json
   {
     "critiques": [
       {
         "timeframe": "medium-term",
         "risk": "Over-reliance on AI reduces critical thinking skills",
         "severity": "medium"
       }
     ]
   }
```

4. **Synthesis**
```json
   {
     "strengthenedIdea": "AI tutoring platform that augments teacher effectiveness by handling routine tasks, allowing teachers to focus on mentorship, emotional support, and critical thinking development",
     "keyImprovements": [
       "Repositioned from replacement to augmentation",
       "Addresses regulatory reality",
       "Preserves teacher jobs while improving outcomes"
     ],
     "remainingRisks": [
       "Implementation challenges in low-tech schools",
       "Teacher training requirements"
     ]
   }
```

5. **Scoring**
```json
   {
     "original": 45,
     "improved": 78,
     "improvement": 33,
     "dimensions": {
       "clarity": { "original": 60, "improved": 85 },
       "riskAwareness": { "original": 30, "improved": 75 },
       "logicalSoundness": 70
     }
   }
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### **POST** `/analyze`

Analyze an idea through the reasoning pipeline.

**Request Body:**
```json
{
  "userInput": "string (10-1000 chars, required)",
  "challengeLevel": "soft | strong (optional, default: soft)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Analysis completed",
  "data": {
    "original": {
      "claim": "string",
      "assumptions": ["string"],
      "confidence": "low | medium | high",
      "domain": "string"
    },
    "analysis": {
      "logic": [
        {
          "type": "string",
          "explanation": "string",
          "severity": "low | medium | high"
        }
      ],
      "market": [...],
      "ethics": [...],
      "future": [...]
    },
    "improved": {
      "strengthenedIdea": "string",
      "keyImprovements": ["string"],
      "remainingRisks": ["string"]
    },
    "scores": {
      "original": 0-100,
      "improved": 0-100,
      "improvement": -100 to 100,
      "dimensions": { ... }
    },
    "meta": {
      "executionTimeMs": 12000,
      "challengeLevel": "soft"
    }
  },
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Input must be at least 10 characters",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "AI reasoning failed. Please try again.",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

#### **GET** `/health`

Check API health status.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "uptime": 3600.5
}
```

### Rate Limits

- **100 requests per 15 minutes** per IP
- Returns `429 Too Many Requests` when exceeded

---

## 🔧 Configuration

### Environment Variables

#### Backend (`.env`)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment | development | No |
| `GROQ_API_KEY` | Groq API key | - | **Yes** |
| `GROQ_MODEL` | Model name | llama-3.3-70b-versatile | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 | No |
| `LOG_LEVEL` | Logging level | info | No |

#### Frontend (`.env`)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api | No |

### LLM Configuration

Edit `backend/src/config/llm.config.js`:
```javascript
export const LLMConfig = {
  reasoning: {
    temperature: 0.7,  // Creativity (0-1)
    maxTokens: 2000,   // Response length
    topP: 0.9          // Nucleus sampling
  },
  extraction: {
    temperature: 0.3,  // More deterministic
    maxTokens: 500,
    topP: 0.8
  },
  synthesis: {
    temperature: 0.8,  // More creative
    maxTokens: 1500,
    topP: 0.95
  }
};
```

---

## 🌐 Deployment

### Production Build

#### Backend
```bash
cd backend
npm install --production
npm start
```

Set `NODE_ENV=production` in `.env`

#### Frontend
```bash
cd frontend
npm run build
```

Output in `frontend/dist/` - serve with:
- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Nginx**

### Docker Deployment (Optional)

**Backend Dockerfile:**
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Configs

**Development:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- CORS: Permissive

**Production:**
- Frontend: Your domain
- Backend: API subdomain (e.g., `api.yourdomain.com`)
- CORS: Restricted to frontend domain
- HTTPS required
- Rate limiting stricter

---

## 💡 Usage Examples

### Example 1: Startup Idea Validation

**Input:**
```
Our college app will succeed because students need it
```

**Challenge Level:** Rigorous

**Output Summary:**
- **Logic Issues:** Assumes need equals success (correlation ≠ causation)
- **Market Reality:** 1000+ existing college apps, high switching costs
- **Ethics:** Privacy concerns with student data
- **Future Risks:** Changing student behavior, regulatory changes
- **Improved Version:** "Productivity platform addressing specific pain point (e.g., class schedule optimization) with clear differentiation from existing solutions"
- **Score Improvement:** +35 points

### Example 2: Tech Prediction

**Input:**
```
AI will replace all software engineers within 5 years
```

**Challenge Level:** Soft

**Output Summary:**
- **Logic Issues:** Overgeneralization, ignores complexity tiers
- **Market Reality:** Historical automation always creates new jobs
- **Ethics:** Fear-mongering without nuance
- **Future Risks:** Underestimates human creativity requirements
- **Improved Version:** "AI will automate routine coding tasks (like boilerplate), enabling engineers to focus on architecture, creative problem-solving, and AI oversight—similar to how IDEs didn't eliminate programmers"
- **Score Improvement:** +28 points

### Example 3: Business Strategy

**Input:**
```
Making our product free will help us capture market share
```

**Challenge Level:** Rigorous

**Output Summary:**
- **Logic Issues:** Assumes price is only barrier to adoption
- **Market Reality:** Free products have low perceived value, high churn
- **Ethics:** Sustainability concerns (how to pay team?)
- **Future Risks:** Difficult to monetize later (user expectations set)
- **Improved Version:** "Freemium model with clear value ladder: free tier for trials, paid tiers with specific ROI-driven features for power users"
- **Score Improvement:** +32 points

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Completed)

- [x] Core reasoning pipeline
- [x] Four specialized critics
- [x] Synthesis engine
- [x] Scoring algorithm
- [x] Web UI with responsive design
- [x] Production-ready backend
- [x] Free LLM integration (Groq)

### 🚧 Phase 2: Enhancement (In Progress)

- [ ] Domain-specific critics (Healthcare, Finance, Climate)
- [ ] Multi-language support (ES, ZH, HI)
- [ ] User authentication & history
- [ ] Idea iteration tracking
- [ ] Export to PDF/DOCX
- [ ] API key management for users

### 🔮 Phase 3: Scale (Q3 2025)

- [ ] Team collaboration features
- [ ] Integration API for third parties
- [ ] Industry knowledge bases
- [ ] Custom critic training
- [ ] Real-time market data integration
- [ ] Mobile apps (iOS, Android)

### 🌟 Phase 4: Intelligence (2026)

- [ ] Predictive success scoring (ML model)
- [ ] AI-generated alternative ideas
- [ ] Expert human review marketplace
- [ ] Network effects from anonymized data
- [ ] Automated competitive analysis
- [ ] Natural language API queries

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Types

- 🐛 **Bug Reports** - Use GitHub Issues
- 💡 **Feature Requests** - Start a Discussion
- 🔧 **Code Contributions** - Submit Pull Requests
- 📖 **Documentation** - Improve README, add examples
- 🧪 **Testing** - Add test cases, report edge cases

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**
```bash
   git checkout -b feature/your-feature-name
```
3. **Make changes with clear commits**
```bash
   git commit -m "feat: add market critic severity weighting"
```
4. **Push to your fork**
```bash
   git push origin feature/your-feature-name
```
5. **Open Pull Request** with description

### Code Standards

- **JavaScript:** ESM modules, async/await preferred
- **React:** Functional components with hooks
- **Naming:** camelCase for variables, PascalCase for components
- **Comments:** Explain "why", not "what"
- **Error Handling:** Always use try-catch with meaningful messages

### Adding a New Critic

1. Create `backend/src/services/YourCritic.js`:
```javascript
import LLMClient from '../core/LLMClient.js';
import PromptEngine from '../core/PromptEngine.js';
import logger from '../utils/logger.js';

class YourCritic {
  async critique(claim, domain, challengeLevel) {
    const prompt = PromptEngine.buildYourCriticPrompt(claim, domain, challengeLevel);
    
    try {
      const response = await LLMClient.call(prompt, {
        systemPrompt: 'You are a [specialty] expert. Return only valid JSON.'
      });
      
      const parsed = this._parseJSON(response);
      logger.info(`Your critique completed: ${parsed.critiques?.length || 0} issues found`);
      
      return parsed.critiques || [];
    } catch (error) {
      logger.error('Your critique failed:', error);
      return [];
    }
  }

  _parseJSON(text) {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { critiques: [] };
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  }
}

export default new YourCritic();
```

2. Add prompt template to `backend/src/prompts/templates.js`

3. Import and call in `backend/src/core/ReasoningPipeline.js`

---

## 🙏 Acknowledgments

### Technologies

- **Groq** - For providing free, fast LLM inference
- **Meta AI** - For the Llama 3.3 70B model
- **React Team** - For the excellent frontend framework
- **Express.js** - For the robust backend framework

### Inspiration

This project was inspired by:
- **Y Combinator's** emphasis on talking to users
- **First Principles Thinking** from Elon Musk
- **Red Team Thinking** from cybersecurity
- **Peer Review** processes in academia

### Community

Special thanks to:
- Everyone who tested early versions
- Contributors who reported bugs
- Communities: r/startups, r/reactjs, r/node

---

## 📞 Contact & Support

### Issues & Bugs

Report via [GitHub Issues](https://github.com/your-username/ai-disagreement-engine/issues)

### Feature Requests

Start a [Discussion](https://github.com/your-username/ai-disagreement-engine/discussions)

### Security Vulnerabilities

Email: security@yourdomain.com (please do not open public issues)

### General Questions

- **Email:** hello@yourdomain.com
- **Twitter:** @yourusername
- **Discord:** [Join our community](https://discord.gg/your-invite)

---

## 📊 Project Stats

- **Total Lines of Code:** ~4,500
- **Backend Files:** 22
- **Frontend Components:** 5
- **API Endpoints:** 2
- **Test Coverage:** 0% (contributions welcome!)
- **Bundle Size:** < 200KB (gzipped)
- **Performance:** < 15s average response time

---

## 🎓 Educational Use

This project is ideal for learning:

- ✅ React application architecture
- ✅ Express.js backend design
- ✅ Prompt engineering techniques
- ✅ API integration patterns
- ✅ Responsive CSS design systems
- ✅ Error handling best practices
- ✅ Modular code organization

**University/Bootcamp Instructors:** Feel free to use this as a teaching example. Attribution appreciated.

---

## ⚖️ Ethical Considerations

### Responsible AI Use

This system:
- ✅ **Augments** human decision-making (doesn't replace)
- ✅ **Transparent** about AI limitations in UI
- ✅ **No data collection** (stateless by design)
- ✅ **Encourages** critical thinking, not blind acceptance
- ⚠️ **Not a substitute** for domain experts or legal/medical advice

### User Guidelines

**Do:**
- Use for brainstorming and idea refinement
- Combine AI feedback with human expertise
- Test multiple iterations
- Share results with advisors

**Don't:**
- Treat output as absolute truth
- Make major decisions based solely on AI feedback
- Submit sensitive/confidential information
- Use for illegal, harmful, or unethical purposes

---

## 🏆 Awards & Recognition

- 🥇 **[Hackathon Name]** - Best AI Application (2024)
- ⭐ **[University]** - Innovation Award (2024)
- 📰 Featured in **[Publication]** (Date)

*(Update as achievements occur)*

---

## 📚 Additional Resources

### Documentation

- [API Reference](docs/API.md)
- [Architecture Deep Dive](docs/ARCHITECTURE.md)
- [Prompt Engineering Guide](docs/PROMPTS.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Tutorials

- [Video: Getting Started](https://youtube.com/...)
- [Blog: Building Adversarial AI](https://blog.yourdomain.com/...)
- [Case Study: Validating 100 Startup Ideas](https://blog.yourdomain.com/...)

### Research Papers

- [Adversarial Reasoning Systems](link)
- [Multi-Agent Critique in LLMs](link)
- [Prompt Engineering Best Practices](link)

---

## 🔄 Version History

### v2.0.0 (Current)
- Premium UI redesign
- Improved prompt templates
- Better error handling
- Performance optimizations

### v1.0.0
- Initial release
- Core reasoning pipeline
- Basic web interface
- Groq integration

---

## 💬 FAQ

**Q: Is this free to use?**  
A: Yes, completely free. Groq provides generous free tier.

**Q: Do you store my ideas?**  
A: No. The system is stateless. Ideas are processed and discarded.

**Q: Can I use this commercially?**  
A: Yes, under MIT license. Attribution appreciated.

**Q: What happens if Groq API is down?**  
A: System shows error with retry option. We're exploring fallback providers.

**Q: Can I add my own critics?**  
A: Yes! See [Contributing](#-contributing) for guide.

**Q: Is this suitable for academic research?**  
A: Yes, but cite appropriately and note AI limitations in methodology.

**Q: How accurate is the critique?**  
A: Based on GPT-4 level reasoning (Llama 3.3 70B). Always verify important decisions with experts.

**Q: Can I deploy this internally at my company?**  
A: Yes. Use your own API keys and deploy privately.

---

<div align="center">

**Built with ❤️ for entrepreneurs, students, and critical thinkers**

[⭐ Star this repo](https://github.com/your-username/ai-disagreement-engine) • [🐛 Report Bug](https://github.com/your-username/ai-disagreement-engine/issues) • [💡 Request Feature](https://github.com/your-username/ai-disagreement-engine/discussions)

---

**Made by [Your Name](https://github.com/your-username)**

</div>
