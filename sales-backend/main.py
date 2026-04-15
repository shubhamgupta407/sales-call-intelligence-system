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

# -----------------------------
# 🔥 Base Directory
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -----------------------------
# 🔥 Load Model (SAFE)
# -----------------------------
embedding_model = None

try:
    print("⏳ Loading embedding model...")
    embedding_model = SentenceTransformer(os.path.join(BASE_DIR, "model"))
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Model loading failed:", e)

# -----------------------------
# 🔥 Load FAISS + Data (SAFE)
# -----------------------------
try:
    index = faiss.read_index(os.path.join(BASE_DIR, "faiss_index.bin"))
    with open(os.path.join(BASE_DIR, "chunks.pkl"), "rb") as f:
        chunks = pickle.load(f)
    print("✅ FAISS + chunks loaded")
except Exception as e:
    print("❌ Error loading FAISS/chunks:", e)
    index = None
    chunks = []

# -----------------------------
# 🔐 API Key
# -----------------------------
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# -----------------------------
# 🧠 Helper Functions
# -----------------------------
def retrieve(query, k=3):
    if embedding_model is None or index is None:
        return []

    try:
        query_embedding = embedding_model.encode([query])
        distances, indices = index.search(np.array(query_embedding), k)
        return [chunks[i] for i in indices[0] if i < len(chunks)]
    except Exception as e:
        print("Retrieve error:", e)
        return []

def call_llm(prompt):
    try:
        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "meta-llama/llama-3-8b-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2
        }

        response = requests.post(url, headers=headers, json=data, timeout=20)
        return response.json()

    except Exception as e:
        print("LLM error:", e)
        return {}

def extract_text(response):
    try:
        return response["choices"][0]["message"]["content"]
    except:
        return str(response)

def extract_json(text):
    try:
        return json.loads(text)
    except:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                pass

    return {
        "summary": "Analysis unavailable",
        "customer_intent": "Medium",
        "objections": [],
        "buying_signals": [],
        "next_action": "Retry analysis"
    }

def refine_output(data):
    weak_phrases = ["need to think", "not sure", "maybe later"]

    try:
        if any(p in data["next_action"].lower() for p in weak_phrases):
            data["next_action"] = "Follow up with the customer to address concerns"
    except:
        pass

    return data

# -----------------------------
# 📦 Request Schema
# -----------------------------
class TranscriptRequest(BaseModel):
    query: str

# -----------------------------
# 🏠 Health Check (IMPORTANT)
# -----------------------------
@app.get("/")
def home():
    return {"status": "running"}

# -----------------------------
# 🚀 MAIN API
# -----------------------------
@app.post("/analyze")
def analyze(request: TranscriptRequest):

    query = request.query.strip()

    # ❌ Input validation
    if not query or len(query) < 10:
        return {
            "summary": "Input too short",
            "customer_intent": "Low",
            "objections": [],
            "buying_signals": [],
            "next_action": "Provide a valid transcript"
        }

    # 🔍 Retrieve context
    retrieved_chunks = retrieve(query)
    context = "\n".join(retrieved_chunks) if retrieved_chunks else "No relevant context found"

    # 🧠 Prompt
    prompt = f"""
You are an AI Sales Call Intelligence System.

Analyze the conversation and extract BUSINESS-LEVEL insights.

Context:
{context}

Return ONLY valid JSON:

{{
  "summary": "...",
  "customer_intent": "High | Medium | Low",
  "objections": ["..."],
  "buying_signals": ["..."],
  "next_action": "..."
}}
"""

    # 🤖 Call LLM
    response = call_llm(prompt)
    text = extract_text(response)

    # 🧾 Process Output
    result = extract_json(text)
    result = refine_output(result)

    return result
