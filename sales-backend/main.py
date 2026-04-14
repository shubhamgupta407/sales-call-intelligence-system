from fastapi import FastAPI
from pydantic import BaseModel
import faiss
import pickle
import numpy as np
import requests
import json
import re
import os
from sentence_transformers import SentenceTransformer

app = FastAPI()

# 🔥 Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# 🔥 Load FAISS + chunks
index = faiss.read_index("faiss_index.bin")

with open("chunks.pkl", "rb") as f:
    chunks = pickle.load(f)

# 🔐 Secure API Key (from environment)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# ------------------------
# Helper Functions
# ------------------------

def retrieve(query, k=3):
    query_embedding = embedding_model.encode([query])
    distances, indices = index.search(np.array(query_embedding), k)
    return [chunks[i] for i in indices[0]]

def call_llm(prompt):
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

    response = requests.post(url, headers=headers, json=data)
    return response.json()

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
        "summary": "",
        "customer_intent": "Medium",
        "objections": [],
        "buying_signals": [],
        "next_action": "Manual review needed"
    }

def refine_output(data):
    weak_phrases = ["need to think", "not sure", "maybe later"]

    if any(p in data["next_action"].lower() for p in weak_phrases):
        data["next_action"] = "Follow up with the customer to address concerns"

    return data

# ------------------------
# API Schema
# ------------------------

class TranscriptRequest(BaseModel):
    query: str

# ------------------------
# MAIN API
# ------------------------

@app.post("/analyze")
def analyze(request: TranscriptRequest):
    retrieved_chunks = retrieve(request.query)
    context = "\n".join(retrieved_chunks)

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

    response = call_llm(prompt)
    text = extract_text(response)

    result = extract_json(text)
    result = refine_output(result)

    return result
