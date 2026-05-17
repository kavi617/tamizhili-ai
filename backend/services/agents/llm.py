from __future__ import annotations

from openai import OpenAI, AuthenticationError

from services.config import get_openai_api_key, get_settings, use_local_llm
from services.local_llm import local_answer
from services.prompts import load_tutor_instructions


def get_openai_client() -> OpenAI:
    return OpenAI(api_key=get_openai_api_key())


def build_prompt(
    *,
    user_query: str,
    retrieved_context: str,
    task: str,
    extra_sections: dict[str, str] | None = None,
) -> str:
    parts = [
        "## Retrieved context (Tamil history knowledge base)",
        retrieved_context.strip() or "(No matching context found.)",
    ]

    if extra_sections:
        for title, body in extra_sections.items():
            parts.append(f"## {title}")
            parts.append(body.strip())

    parts.extend(
        [
            "## User query",
            user_query.strip(),
            "## Your task",
            task.strip(),
        ]
    )
    return "\n\n".join(parts)


def _language_directive(response_language: str) -> str:
    if response_language == "ta":
        return (
            "## Response language (mandatory)\n"
            "Write your entire reply for the student in natural modern Tamil (தமிழ்).\n"
        )
    return (
        "## Response language (mandatory)\n"
        "Write your entire reply for the student in clear English.\n"
    )


def merge_tutor_instructions(
    system_prompt: str,
    *,
    response_language: str = "en",
    add_language_directive: bool = True,
) -> str:
    guide = load_tutor_instructions()
    parts = [system_prompt.strip()]
    if guide:
        parts.append(
            "## தமிழி AI tutor guidelines (always follow)\n" + guide.strip()
        )
    if add_language_directive:
        parts.append(_language_directive(response_language))
    return "\n\n".join(parts)


def complete(
    *,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.7,
    user_query_for_fallback: str | None = None,
    response_language: str = "en",
    add_language_directive: bool = True,
) -> str:
    """Offline archives only when LLM_PROVIDER=local; otherwise always ChatGPT."""
    if use_local_llm():
        return local_answer(
            user_query_for_fallback or user_prompt,
            response_language=response_language,
        )

    settings = get_settings()
    client = get_openai_client()
    full_system = merge_tutor_instructions(
        system_prompt,
        response_language=response_language,
        add_language_directive=add_language_directive,
    )
    try:
        response = client.chat.completions.create(
            model=settings.openai_chat_model,
            messages=[
                {"role": "system", "content": full_system},
                {"role": "user", "content": user_prompt},
            ],
            temperature=temperature,
        )
        return (response.choices[0].message.content or "").strip()
    except AuthenticationError as exc:
        raise RuntimeError(
            "OpenAI rejected the API key. Check OPENAI_API_KEY in backend/.env "
            "and restart uvicorn."
        ) from exc


def agent_complete(
    *,
    system_prompt: str,
    user_query: str,
    retrieved_context: str,
    task: str,
    temperature: float = 0.7,
    extra_sections: dict[str, str] | None = None,
    response_language: str = "en",
    add_language_directive: bool = True,
) -> str:
    user_prompt = build_prompt(
        user_query=user_query,
        retrieved_context=retrieved_context,
        task=task,
        extra_sections=extra_sections,
    )
    return complete(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        temperature=temperature,
        user_query_for_fallback=user_query,
        response_language=response_language,
        add_language_directive=add_language_directive,
    )
