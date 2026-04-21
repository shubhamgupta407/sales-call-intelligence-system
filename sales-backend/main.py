from fastapi import FastAPI
from pydantic import BaseModel
import faiss
import pickle
import numpy as np
import requests
import json
import re
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

load_dotenv()

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


class TranscriptRequest(BaseModel):
    query: str


embedding_model = None
index = None
chunks = []


def load_rag_components():
    global embedding_model, index, chunks

    try:
        embedding_model = SentenceTransformer(os.path.join(BASE_DIR, "model"))
        print("Embedding model loaded")
    except Exception as e:
        print("Embedding model unavailable:", e)

    try:
        index = faiss.read_index(os.path.join(BASE_DIR, "faiss_index.bin"))

        with open(os.path.join(BASE_DIR, "chunks.pkl"), "rb") as f:
            chunks = pickle.load(f)

        print("Vector index loaded")
    except Exception as e:
        print("Vector index unavailable:", e)


load_rag_components()


def retrieve_context(query: str, k: int = 3):
    if embedding_model is None or index is None:
        return []

    try:
        query_vector = embedding_model.encode([query])
        _, indices = index.search(np.array(query_vector), k)

        return [chunks[i] for i in indices[0] if i < len(chunks)]
    except Exception as e:
        print("Retrieval failed:", e)
        return []


def call_llm(prompt: str):
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-3-8b-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0,
                "max_tokens": 1400
            },
            timeout=30
        )

        return response.json()

    except Exception as e:
        print("LLM request failed:", e)
        return {}


def extract_text(response):
    try:
        return response["choices"][0]["message"]["content"]
    except Exception:
        return str(response)


def parse_json(text):
    try:
        return json.loads(text)
    except Exception:
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            try:
                return json.loads(match.group())
            except Exception:
                pass

    return {
        "call_summary": "Analysis unavailable",
        "lead_score": 50,
        "conversion_probability": "Medium",
        "customer_intent": {
            "level": "Medium",
            "reason": "Unable to determine confidently"
        },
        "sentiment_analysis": {
            "overall": "Neutral",
            "confidence": 0.5
        },
        "objections": [],
        "buying_signals": [],
        "urgency_level": "Low",
        "decision_stage": "Unknown",
        "competitor_mentions": [],
        "next_best_action": {
            "action": "Retry analysis",
            "priority": "Medium",
            "owner": "Sales Rep"
        },
        "follow_up_email_draft": "",
        "crm_fields": {
            "budget_status": "Unknown",
            "timeline": "Unknown",
            "decision_maker_identified": False
        },
        "risk_flags": [],
        "key_quotes": []
    }


def build_prompt(transcript: str, context: str):
    return f"""
You are an AI Sales Call Intelligence Engine.

Use the transcript as the primary source of truth.
Use retrieved context only as supporting memory.
Do not invent facts, objections, urgency, or buying signals.
If unclear, keep arrays empty.
Return only valid JSON.

Lead Score:
0-30 Cold
31-60 Moderate
61-80 Warm
81-100 Hot

Decision Stage:
Awareness | Consideration | Negotiation | Closing | Lost | Unknown

Transcript:
{transcript}

Supporting Context:
{context}

Return JSON:

{{
  "call_summary": "",
  "lead_score": 0,
  "conversion_probability": "High | Medium | Low",

  "customer_intent": {{
    "level": "High | Medium | Low",
    "reason": ""
  }},

  "sentiment_analysis": {{
    "overall": "Positive | Neutral | Negative",
    "confidence": 0.0
  }},

  "objections": [
    {{
      "type": "",
      "severity": "High | Medium | Low",
      "quote": ""
    }}
  ],

  "buying_signals": [
    {{
      "signal": "",
      "strength": "High | Medium | Low"
    }}
  ],

  "urgency_level": "High | Medium | Low",
  "decision_stage": "",

  "competitor_mentions": [],

  "next_best_action": {{
    "action": "",
    "priority": "High | Medium | Low",
    "owner": "Sales Rep"
  }},

  "follow_up_email_draft": "",

  "crm_fields": {{
    "budget_status": "",
    "timeline": "",
    "decision_maker_identified": true
  }},

  "risk_flags": [],
  "key_quotes": []
}}
"""


@app.get("/")
def home():
    return {
        "status": "running",
        "rag_ready": embedding_model is not None and index is not None
    }


@app.post("/analyze")
def analyze(request: TranscriptRequest):
    transcript = request.query.strip()

    if len(transcript) < 10:
        return {
            "call_summary": "Input too short",
            "lead_score": 0,
            "conversion_probability": "Low"
        }

    context_chunks = retrieve_context(transcript)
    context = "\n".join(context_chunks) if context_chunks else "No relevant context found."

    prompt = build_prompt(transcript, context)

    response = call_llm(prompt)
    text = extract_text(response)

    return parse_json(text)
