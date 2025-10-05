import os
import requests
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# --- 1. Initialize FastAPI ---
app = FastAPI()

# --- 2. Configure CORS ---
# This is crucial for allowing your React frontend to communicate with this backend.
# It's a security feature that browsers enforce.
origins = [
    "http://localhost:5173",  # Default Vite React dev server
    "http://localhost:3000",  # Common Create React App dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# --- 3. Define the Request Data Structure ---
# Pydantic model ensures the incoming data has the correct format.
class ChatInput(BaseModel):
    user_message: str

# --- 4. Ollama Configuration ---
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5")

async def call_ollama(prompt: str, system_message: str = "You are a helpful assistant."):
    """Call Ollama API with the given prompt."""
    try:
        payload = {
            "model": OLLAMA_MODEL,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ],
            "stream": False
        }
        
        response = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json=payload,
            timeout=60
        )
        response.raise_for_status()
        
        result = response.json()
        return result["message"]["content"]
    
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Ollama service unavailable: {str(e)}")
    except KeyError as e:
        raise HTTPException(status_code=502, detail=f"Unexpected response format from Ollama: {str(e)}")

# --- 5. Create API Endpoints ---
@app.get("/")
async def health_check():
    """A simple endpoint to confirm the server is running."""
    return {"status": "ok", "model": OLLAMA_MODEL, "ollama_url": OLLAMA_URL}

@app.post("/chat")
async def chat_with_ai(input_data: ChatInput):
    """The main endpoint to handle chat interactions."""
    try:
        # Forward the user's message to Ollama
        bot_response = await call_ollama(input_data.user_message)
        return {"bot_response": bot_response}

    except Exception as e:
        # Properly handle potential API errors
        raise HTTPException(status_code=500, detail=str(e))