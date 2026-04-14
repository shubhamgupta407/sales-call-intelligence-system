# Sales Call Intelligence System (RAG + LLM)
Production-style AI system simulating real-world sales intelligence workflows.

AI-powered system that analyzes sales call transcripts and generates structured business insights.

Built using a RAG pipeline with FAISS and LLMs to extract customer intent, objections, buying signals, and next actions.

---

## 🚀 Live Demo
Frontend: https://salesanalyze.netlify.app  
Backend: Deployed (may take a few seconds to respond on first request)

---

## ✨ Features

- RAG-based retrieval using FAISS
- NLP-based extraction of customer intent, objections, and buying signals
- Real-time call analysis using LLMs
- Structured JSON output for business insights
- Transcript storage for historical analysis
- Fallback mechanism for seamless UI experience

---

## 🎯 Use Case

- Sales teams can analyze call transcripts automatically  
- Identify customer intent and objections  
- Get AI-driven next action recommendations  
- Improve conversion and decision-making  

## 🛠 Tech Stack

- FastAPI (Backend)
- FAISS (Vector Search)
- Sentence Transformers (Embeddings)
- OpenRouter API (LLMs)
- React.js (Frontend)

---

## ⚙️ How It Works

1. User inputs sales call transcript  
2. Text is chunked and converted into embeddings  
3. FAISS retrieves relevant context  
4. LLM processes the context and generates insights  
5. Output includes summary, intent, objections, buying signals, and next actions  

---

## 📊 Sample Output

```json
{
  "summary": "Customer is interested but concerned about pricing.",
  "customer_intent": "Medium",
  "objections": ["Pricing seems high"],
  "buying_signals": ["Interested in discount"],
  "next_action": "Follow up with pricing clarification"
}

🔮 Future Improvements


Improve backend scalability


Enhance transcript storage and analytics


Optimize LLM response reliability



