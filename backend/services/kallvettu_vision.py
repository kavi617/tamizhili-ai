"""Read Tamil kallvettu (inscription) images via OpenAI vision → normalized Tamil text."""

from __future__ import annotations

import base64
import re

from openai import AuthenticationError, OpenAI

from services.config import get_openai_api_key, get_settings, use_local_llm

TRANSCRIBE_SYSTEM = """You are an expert Tamil epigraphy assistant (கல்வெட்டு reader).

Goal: Maximize **literal accuracy** (target ≥50% correct graphemes on typical museum photos; aim higher on clear rubbings).

Task: Read the inscription and write it in **modern Unicode Tamil** (standard web Tamil script).

Method (follow in order):
1. Briefly note orientation (horizontal lines / vertical columns) if it helps reading order.
2. Transcribe **line by line** (or column by column), separated by newlines, matching source order.
3. Where a character is unclear, output the **single best reading** and suffix it with ? (one ? per uncertain glyph/cluster).
4. If completely unreadable for a span, use … or [illegible] — never guess filler words or full phrases from context alone.
5. Preserve numerals and symbols as seen; normalize dated Tamil numerals to Arabic digits only when clearly identifiable.
6. Grantha / Sanskrit loans: keep Tamil-script equivalents when standard; if ambiguous, keep conservative reading + ?.

If the image is not an inscription or too blurry, reply with one short sentence stating that.

Output format:
- First: the transcription blocks only (Tamil text + ? markers as needed).
- Final line (optional): English note starting with "Note:" if lighting/language mix affects confidence (max one sentence)."""

_DATA_URL_RE = re.compile(r"^data:(?P<mime>[\w/+.-]+);base64,(?P<b64>.+)$", re.DOTALL)


def _decode_image_payload(payload: str) -> tuple[bytes, str]:
    raw = payload.strip()
    m = _DATA_URL_RE.match(raw)
    if m:
        mime = m.group("mime").strip() or "image/jpeg"
        b64 = m.group("b64").strip()
        return base64.standard_b64decode(b64), mime
    return base64.standard_b64decode(raw), "image/jpeg"


def transcribe_kallvettu_from_payload(image_payload: str) -> str:
    """Accept data URL or raw base64; return normalized Tamil transcription."""
    if use_local_llm():
        raise ValueError(
            "Stone inscription images need OpenAI vision. Set LLM_PROVIDER=openai "
            "and OPENAI_API_KEY in backend/.env."
        )

    image_bytes, mime = _decode_image_payload(image_payload)
    if len(image_bytes) > 12 * 1024 * 1024:
        raise ValueError("Image too large (max ~12 MB).")

    settings = get_settings()
    model = (settings.openai_vision_model or "").strip() or settings.openai_chat_model

    b64 = base64.standard_b64encode(image_bytes).decode("ascii")
    data_url = f"data:{mime};base64,{b64}"

    client = OpenAI(api_key=get_openai_api_key())

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": TRANSCRIBE_SYSTEM},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "Transcribe this stone inscription (கல்வெட்டு). "
                                "Use high zoom mentally on each line; prefer cautious readings with ? over invention."
                            ),
                        },
                        {
                            "type": "image_url",
                            "image_url": {"url": data_url, "detail": "high"},
                        },
                    ],
                },
            ],
            temperature=0,
            max_tokens=4096,
        )
        return (response.choices[0].message.content or "").strip()
    except AuthenticationError as exc:
        raise RuntimeError(
            "OpenAI rejected the API key while reading the inscription image."
        ) from exc
