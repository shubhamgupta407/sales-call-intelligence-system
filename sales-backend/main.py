from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# CORS fix for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        "key_quotes": [],
        "action_directives": [],
        "intent_analysis": {
            "budget_alignment": {"status": "UNVERIFIED", "confidence": 0, "evidence": ""},
            "timeline_clarity": {"status": "UNCLEAR", "confidence": 0, "evidence": ""},
            "decision_authority": {"status": "UNKNOWN", "confidence": 0, "evidence": ""}
        }
    }


def build_prompt(transcript: str, context: str):
    return f"""
You are a senior B2B Revenue Intelligence AI. Analyze the sales call transcript below with precision.
Use the transcript as the PRIMARY source of truth. Use retrieved context only as supporting memory.
Do NOT invent facts, objections, signals, or quotes that are not present in the transcript.
Return ONLY valid JSON. No explanation. No markdown. No code blocks.

SCORING RULES for lead_score (0-100):
- Budget confirmed or clearly implied in transcript: +25
- Decision maker present or identified: +20
- Clear timeline or urgency expressed: +20
- Competitor evaluation mentioned (risk factor): -15
- Objections raised and NOT resolved in call: -10 per objection
- Next step agreed upon during call: +15
- Overall positive sentiment: +10
The lead_score MUST be mathematically consistent with sentiment_analysis, customer_intent, and crm_fields.
If sentiment is Positive and budget is confirmed and decision maker is identified, score MUST be above 60.

EXECUTIVE SUMMARY RULES for call_summary:
- Must be 3-4 sentences minimum
- Must mention the specific product/service discussed in the transcript
- Must reference the customer's specific pain point from the transcript
- Must mention any competitors or alternatives the customer named
- Must state the current deal stage based on conversation evidence
- Must be written in professional third-person enterprise language
- NEVER write generic phrases like "Strategic analysis complete" or "Review action directives"

ACTION DIRECTIVES RULES for action_directives:
- Generate exactly 3 specific next-best actions
- Each action MUST reference something explicitly mentioned in this transcript
- Actions must be concrete: who to contact, what to send, what to address
- If competitor names appear in transcript, one action must be a competitive response
- NEVER generate generic actions like "follow up with customer" or "schedule a call"

FOLLOW-UP EMAIL RULES for follow_up_email_draft:
- MUST always generate a complete email, never leave empty
- Subject line must reference the specific conversation topic
- Opening must acknowledge the customer's specific pain point from the transcript
- Middle must address any objections or competitors mentioned
- Must include one clear CTA
- Max 150 words
- Use "Hi there" if customer name is unknown
- Return as plain text with Subject: on first line, then blank line, then body

INTENT ANALYSIS RULES for intent_analysis:
- budget_alignment status: VERIFIED (explicitly confirmed) | PARTIAL (implied) | UNVERIFIED (not mentioned)
- timeline_clarity status: CONFIRMED (date/timeframe given) | PENDING (mentioned but vague) | UNCLEAR (not discussed)
- decision_authority status: CONFIRMED (decision maker on call) | SHARED (multiple stakeholders) | UNKNOWN (not established)
- confidence: 0-100 based on how clearly the transcript supports the status
- evidence: exact quote or direct signal from the transcript that justifies the status

Transcript:
{transcript}

Supporting Context:
{context}

Return this exact JSON structure with all fields populated based on the transcript:

{{
  "call_summary": "<3-4 sentence specific summary referencing transcript content>",
  "lead_score": 0,
  "conversion_probability": "High | Medium | Low",

  "customer_intent": {{
    "level": "High | Medium | Low",
    "reason": "<specific reason grounded in transcript>"
  }},

  "sentiment_analysis": {{
    "overall": "Positive | Neutral | Negative",
    "confidence": 0.0
  }},

  "objections": [
    {{
      "type": "<specific objection type from transcript>",
      "severity": "High | Medium | Low",
      "quote": "<exact or paraphrased quote from transcript>"
    }}
  ],

  "buying_signals": [
    {{
      "signal": "<specific signal from transcript>",
      "strength": "High | Medium | Low"
    }}
  ],

  "urgency_level": "High | Medium | Low",
  "decision_stage": "Awareness | Consideration | Negotiation | Closing | Lost | Unknown",

  "competitor_mentions": ["<only competitors explicitly named in transcript>"],

  "next_best_action": {{
    "action": "<specific action referencing transcript content>",
    "priority": "High | Medium | Low",
    "owner": "Sales Rep"
  }},

  "action_directives": [
    "<specific action 1 referencing transcript>",
    "<specific action 2 referencing transcript>",
    "<specific action 3 referencing transcript>"
  ],

  "follow_up_email_draft": "<Subject: ...\n\nHi there,\n\n...full email body here...>",

  "crm_fields": {{
    "budget_status": "<Confirmed | Implied | Unknown>",
    "timeline": "<specific timeline if mentioned, else Unknown>",
    "decision_maker_identified": true
  }},

  "intent_analysis": {{
    "budget_alignment": {{
      "status": "VERIFIED | PARTIAL | UNVERIFIED",
      "confidence": 0,
      "evidence": "<quote or signal from transcript>"
    }},
    "timeline_clarity": {{
      "status": "CONFIRMED | PENDING | UNCLEAR",
      "confidence": 0,
      "evidence": "<quote or signal from transcript>"
    }},
    "decision_authority": {{
      "status": "CONFIRMED | SHARED | UNKNOWN",
      "confidence": 0,
      "evidence": "<quote or signal from transcript>"
    }}
  }},

  "risk_flags": ["<only real risks evident in transcript>"],
  "key_quotes": ["<important quotes directly from transcript>"]
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
