"""
தமிழி AI FastAPI application.

Run: uvicorn main:app --reload
POST /chat accepts JSON with optional inscription image (see schemas.ChatRequest).
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from openai import RateLimitError

from schemas import ChatRequest, ChatResponse
from services.config import get_settings, use_local_llm
from services.kallvettu_vision import transcribe_kallvettu_from_payload
from services.pipeline import run_pipeline

app = FastAPI(
    title="தமிழி AI",
    description="Interactive Tamil History Learning System API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def build_pipeline_query(req: ChatRequest) -> str:
    """Merge typed question + optional kallvettu OCR transcript into one pipeline input."""
    text = req.message.strip()
    img = (req.image_base64 or "").strip()

    if not img:
        return text

    transcript = transcribe_kallvettu_from_payload(img)
    if text:
        return (
            f"{text}\n\n"
            "--- கல்வெட்டு transcription (normalized Tamil script) ---\n"
            f"{transcript}"
        )
    return (
        "The user uploaded a Tamil stone inscription (கல்வெட்டு) photo only. "
        "Using the transcription below, explain what it likely says, its historical period "
        "if inferable, and wider context. Note any uncertain readings.\n\n"
        "--- Transcription ---\n"
        f"{transcript}"
    )


@app.get("/")
async def root():
    return "Backend running"


@app.get("/health")
async def health():
    settings = get_settings()
    return {
        "status": "healthy",
        "chat_model": settings.openai_chat_model,
        "vision_model": settings.openai_vision_model or settings.openai_chat_model,
        "embedding_model": settings.openai_embedding_model,
        "embedding_provider": settings.embedding_provider,
        "llm_provider": settings.llm_provider,
        "cloud_llm_enabled": not use_local_llm(),
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        q = build_pipeline_query(request)
        lang = request.response_language if request.response_language in ("en", "ta") else "en"
        return run_pipeline(q, response_language=lang)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except RateLimitError as exc:
        raise HTTPException(
            status_code=429,
            detail=f"OpenAI rate limit: {exc}. Retry shortly or check billing.",
        ) from exc
    except Exception as exc:
        if "OPENAI_API_KEY" in str(exc):
            raise HTTPException(
                status_code=503,
                detail="OPENAI_API_KEY is not configured.",
            ) from exc
        raise
