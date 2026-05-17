"""
Character Agent — responds in first person as a Tamil historical figure.

Grounded by Historian facts + RAG context to limit hallucination.
"""
from __future__ import annotations

from services.agents.llm import agent_complete
from services.agents.types import AgentOutput

SYSTEM_PROMPT = """You are the Character Agent for தமிழி AI. Respond in first person as a
historical figure from Tamil history. Use the retrieved context and historian facts.
Stay in character, be engaging for students, and do not invent facts beyond the sources.
End with: [Speaking as: <character name>]"""


def character_agent(
    user_query: str,
    *,
    historian_facts: str,
    retrieved_context: str,
    character_name: str | None = None,
    response_language: str = "en",
) -> AgentOutput:
    """Respond as a historical figure using GPT with RAG context and historian facts."""
    figure_hint = character_name or "the most relevant Tamil historical figure for this question"

    content = agent_complete(
        system_prompt=SYSTEM_PROMPT,
        user_query=user_query,
        retrieved_context=retrieved_context,
        task=f"Reply in first person as: {figure_hint}.",
        temperature=0.8,
        extra_sections={
            "Historian verified facts": historian_facts,
            "Character to portray": figure_hint,
        },
        response_language=response_language,
    )

    return AgentOutput(
        agent_name="character",
        content=content,
        metadata={"character": figure_hint},
    )
