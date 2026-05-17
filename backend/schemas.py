from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, model_validator


class ChatRequest(BaseModel):
    message: str = Field(default="", max_length=32000, description="User text query")
    response_language: Literal["en", "ta"] = Field(
        default="en",
        description="Language for assistant replies (English or Tamil)",
    )
    image_base64: str | None = Field(
        None,
        description="Optional inscription photo as data URL or raw base64 (JPEG/PNG/WebP)",
    )

    @model_validator(mode="after")
    def need_message_or_image(self) -> ChatRequest:
        msg_ok = bool(self.message.strip())
        img_ok = bool((self.image_base64 or "").strip())
        if not msg_ok and not img_ok:
            raise ValueError("Send a message and/or a கல்வெட்டு (inscription) image.")
        if self.image_base64 and len(self.image_base64) > 18_000_000:
            raise ValueError("Image payload too large; try a smaller photo (~under 10 MB).")
        return self


class PipelineStepOut(BaseModel):
    """Single explainability step for judges / UI visualization."""

    id: str = Field(..., description="Stable id for frontend highlighting")
    label: str = Field(..., description="Human-readable step label")


class ChatResponse(BaseModel):
    response: str
    steps: list[PipelineStepOut] = Field(
        default_factory=list,
        description="Ordered pipeline steps executed for this answer",
    )
    intent: str | None = Field(
        None,
        description="Detected intent when cloud LLM pipeline ran: fact | character | story",
    )
