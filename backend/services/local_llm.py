from __future__ import annotations

from services.retrieval import retrieve_relevant_chunks
from services.sources import format_source_links


def local_answer(user_query: str, *, response_language: str = "en") -> str:
    """
    Build an answer from retrieved chunks without calling OpenAI.
    Used when quota is exceeded or LLM_PROVIDER=local.
    """
    try:
        chunks = retrieve_relevant_chunks(user_query, top_k=5)
    except RuntimeError:
        return (
            "வரலாற்றுக் காப்பகங்கள் இன்னும் ஏற்றப்படவில்லை. "
            "இயக்கவும்: python -m services.vector_store"
            if response_language == "ta"
            else (
                "The historical archives are not yet loaded. "
                "Please run: python -m services.vector_store"
            )
        )

    if not chunks:
        return (
            "தமிழ் வரலாற்றுக் காப்பகங்களில் பொருந்தும் பகுதிகள் இல்லை. "
            "சோழர், பாண்டியர், சங்க இலக்கியம், கீழடி போன்ற தலைப்புகளை முயற்சிக்கவும்."
            if response_language == "ta"
            else (
                "I could not find matching passages in the Tamil history archives "
                "for your question. Try asking about the Chola Empire, Pandyas, Sangam literature, "
                "Keezhadi, or Tamil temples."
            )
        )

    intro = (
        "தமிழி AI காப்பகங்களிலிருந்து:\n\n"
        if response_language == "ta"
        else "From the தமிழி AI Root Agent archives:\n\n"
    )
    body_parts: list[str] = []
    for chunk in chunks:
        part = f"**{chunk.topic}**\n{chunk.text}"
        if chunk.source_url:
            part += f"\nReference: {chunk.source_url}"
        body_parts.append(part)

    body = "\n\n".join(body_parts)
    links = format_source_links(chunks)
    return intro + body + links
