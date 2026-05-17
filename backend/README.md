# தமிழி AI – Backend

FastAPI backend for the Tamil History Learning System.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload
```

API docs: http://localhost:8000/docs

## ChromaDB (vector store)

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
2. Ingest Tamil history chunks:

```bash
python -m services.vector_store
# or
python scripts/ingest_history.py
```

Data persists in `backend/chroma_db/` across restarts.

## Retrieval (RAG context)

```python
from services.retrieval import retrieve_relevant_chunks, retrieve_context

chunks = retrieve_relevant_chunks("Who built Brihadeeswarar Temple?", top_k=3)
context = retrieve_context("Chola empire and trade", top_k=5)
```

## Multi-agent pipeline

```python
from services.agents import root_agent, QueryIntent

result = root_agent("Tell me a story about Rajaraja Chola")
print(result.final_response)

# Or force a mode:
result = root_agent("Who built Brihadeeswarar?", intent=QueryIntent.FACT)
```

Agents live in `services/agents/` (root, historian, character, story, validation).

Set `OPENAI_API_KEY` and `OPENAI_CHAT_MODEL` (default `gpt-4o-mini`). Use **`LLM_PROVIDER=openai`** (default) for ChatGPT; use **`LLM_PROVIDER=local`** only for offline archive-only replies with no API calls.

### Pipeline & Chat API

Flow: **user input → Root Agent → Historian / Character / Story → Validation → Combiner**

Optional **கல்வெட்டு**: POST JSON may include `image_base64` (data URL or raw base64). The backend runs OpenAI vision to transcribe the inscription into modern Tamil, then sends that text through the same pipeline. Requires `LLM_PROVIDER=openai` and a vision-capable model (`OPENAI_VISION_MODEL` or `OPENAI_CHAT_MODEL`).

Shared reply rules for GPT live in `services/prompts/tutor_instructions.txt` (bold titles, tone, references).

```bash
uvicorn main:app --reload
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Tell me about Chola temples\"}"
```

Response:
```json
{"response": "final AI answer"}
```

Python:
```python
from services.pipeline import run_pipeline
print(run_pipeline("Who built Brihadeeswarar Temple?"))
```
