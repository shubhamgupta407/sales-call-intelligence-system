<div align="center">

# 🚀 Synthex — AI Sales Call Intelligence Platform

### Enterprise Revenue Intelligence powered by RAG + LLM Systems

Analyze sales conversations, uncover buying intent, detect objections, score opportunities, and generate next-best actions using production-grade AI workflows.

![React](https://img.shields.io/badge/React-149ECA?style=for-the-badge&logo=react&logoColor=white&labelColor=000000)
![FastAPI](https://img.shields.io/badge/FastAPI-0C9D58?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=000000)
![FAISS](https://img.shields.io/badge/FAISS-E91E63?style=for-the-badge&logo=facebook&logoColor=white&labelColor=000000)
![LLM](https://img.shields.io/badge/LLM-9C27B0?style=for-the-badge&logo=openai&logoColor=white&labelColor=000000)
![OpenRouter](https://img.shields.io/badge/OpenRouter-F4511E?style=for-the-badge&logo=router&logoColor=white&labelColor=000000)
![Vector_DB](https://img.shields.io/badge/Vector_DB-00ACC1?style=for-the-badge&logo=databricks&logoColor=white&labelColor=000000)
![Render](https://img.shields.io/badge/Render-E53935?style=for-the-badge&logo=render&logoColor=white&labelColor=000000)
![Netlify](https://img.shields.io/badge/Netlify-00A86B?style=for-the-badge&logo=netlify&logoColor=white&labelColor=000000)

### Built to simulate real-world B2B Sales Intelligence Infrastructure

### Still in development process
</div>


## 📌 Overview

**Synthex** is an AI-powered sales intelligence platform that transforms raw sales call transcripts into structured business insights.

Instead of manually reviewing calls, revenue teams can instantly understand:

- Customer intent
- Deal probability
- Objections blocking conversion
- Buying signals
- Urgency level
- Recommended next actions
- Follow-up communication drafts

This project combines **Retrieval-Augmented Generation (RAG)** with **Large Language Models (LLMs)** to create a realistic production-style revenue intelligence workflow.

---

## 🎯 Why This Project Matters

Modern sales teams lose revenue because:

- Important objections are missed
- Managers cannot review every call
- Follow-ups are inconsistent
- Forecasting is based on gut feeling
- Customer intent is hidden in conversations

**Synthex solves this by converting conversations into measurable pipeline intelligence.**

---

## 🧠 Core Capabilities

### 🔍 AI Transcript Analysis
Upload or paste sales call transcripts and receive structured intelligence instantly.

### 📈 Lead Scoring Engine
Generates opportunity scores using conversational signals such as:

- Positive buying intent
- Budget mentions
- Decision-maker involvement
- Urgency indicators
- Sentiment confidence
- Objection severity

### 🚨 Objection Detection
Automatically detects common blockers:

- Pricing concerns
- Integration concerns
- Implementation risk
- Timing delays
- Competitor comparison
- Internal approval issues

### 📬 Follow-up Automation
Creates smart next-step recommendations and follow-up email drafts.

### 🧠 RAG Memory Layer
Retrieves relevant historical context and chunks before LLM reasoning.

### 📊 Executive Dashboard
Turns call transcripts into premium SaaS-style intelligence reports.

---

## 🏗 System Architecture

```text
User Transcript
      ↓
Text Preprocessing
      ↓
Chunking Engine
      ↓
Sentence Embeddings
      ↓
FAISS Vector Search
      ↓
Relevant Context Retrieval
      ↓
LLM Reasoning Layer
      ↓
Structured JSON Intelligence
      ↓
Frontend Dashboard Visualization
```

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Recharts
- Vite

### Backend
- FastAPI
- Python
- Pydantic
- Uvicorn

### AI / NLP Stack
- OpenRouter LLM APIs
- Sentence Transformers
- FAISS Vector Index
- Prompt Engineering Pipelines

### Deployment
- Netlify (Frontend)
- Render (Backend)

---

## 🔥 Live Demo

**Frontend:** https://analyzesales.netlify.app/

**Backend API:** Deployed on Render (free tier cold start may delay first request)

---

## 📸 Product Modules

### 1. Analyze Call
Paste transcript → Receive AI intelligence deck

### 2. Intelligence Dashboard
Track:
- Revenue analyzed
- Opportunity scores
- Session trends
- Risk patterns

### 3. CRM Output Layer
Ready for:
- Salesforce
- HubSpot
- Zoho
- Internal CRMs

---

## 📦 Example Output

```json
{
  "call_summary": "Customer interested but concerned about pricing and integration.",
  "lead_score": 78,
  "conversion_probability": "High",
  "customer_intent": {
    "level": "High"
  },
  "objections": [
    {
      "type": "Pricing",
      "severity": "Medium"
    },
    {
      "type": "Integration",
      "severity": "Low"
    }
  ],
  "buying_signals": [
    "Asked for implementation timeline",
    "Requested demo"
  ],
  "next_best_action": {
    "action": "Send pricing breakdown and schedule technical demo"
  }
}
```

---

## 🧪 Real Business Use Cases

### For Sales Representatives
- Improve follow-ups
- Handle objections better
- Increase close rate

### For Sales Managers
- Coach underperforming reps
- Monitor pipeline quality
- Detect patterns across calls

### For Founders / Revenue Leaders
- Forecast deals more accurately
- Identify revenue leaks
- Build repeatable GTM systems

---

## 🛠 Local Setup

### Clone Repository
```bash
git clone https://github.com/yourusername/synthex.git
cd synthex
```

### Backend Setup
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` file:

```env
OPENROUTER_API_KEY=your_key_here
MODEL_NAME=your_model
```

---

## 📁 Suggested Folder Structure

```text
synthex/
│── backend/
│   ├── main.py
│   ├── rag.py
│   ├── prompts.py
│   ├── embeddings.py
│   └── schemas.py
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── charts/
│
│── assets/
│── README.md
│── requirements.txt
```

---

## 🚀 Engineering Highlights

### Production Thinking Applied
- CORS handled for frontend/backend separation
- Fallback responses for better UX
- Cold-start tolerant architecture
- Structured API contracts with Pydantic
- Modular frontend components

### AI Product Thinking Applied
- Output optimized for business decisions, not raw text
- Premium UX for trust-building
- Explainable scoring potential
- Multi-session future scalability

---

## 🧠 Challenges Solved

**Context Understanding in Long Transcripts** → Solved using chunking + retrieval

**Hallucination Reduction** → Solved using RAG grounding

**Frontend / Backend Integration** → Handled deployment separation + API proxy + CORS

**Business-Friendly Output** → Converted LLM responses into actionable JSON

---

## 🔮 Future Roadmap

### Phase 2
- Multi-call analytics dashboard
- Historical transcript memory
- Rep performance benchmarking
- Deal risk forecasting
- CRM push integrations

### Phase 3
- Audio upload + speech-to-text
- Sentiment from voice tone
- Real-time live call copilot
- Team coaching recommendations
- Fine-tuned domain model

---

## 💼 Why Recruiters Like This Project

This project demonstrates:

✅ Full-stack engineering
✅ AI product building ability
✅ Real-world business problem solving
✅ API deployment experience
✅ Modern UI/UX execution
✅ LLM + RAG architecture knowledge
✅ Startup execution mindset

---

## 👨‍💻 Built By

**Shubham Gupta**
B.Tech CSE | AI/ML + Full Stack Developer

Focused on building production-grade AI systems, SaaS tools, and intelligent automation products.

---

<div align="center">

### ⭐ If You Like This Project

Give it a star and connect.

</div>
