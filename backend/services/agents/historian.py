"""
Historian Agent — produces factual answers using retrieved Tamil history chunks.

Uses OpenAI (or local RAG fallback) with strict grounding in ChromaDB context.
"""
from __future__ import annotations

from services.agents.llm import agent_complete
from services.agents.types import AgentOutput
from services.retrieval import retrieve_context

SYSTEM_PROMPT = """You are the Historian Agent for தமிழி AI, an expert on Tamil history.
Use ONLY the retrieved context below. If information is missing, say so clearly.
Do not invent dates, names, or events. Be accurate, concise, and educational."""


def historian_agent(
    user_query: str,
    *,
    retrieved_context: str | None = None,
    response_language: str = "en",
) -> AgentOutput:
    """Retrieve relevant Tamil history from ChromaDB and produce a factual GPT answer."""
    context = retrieved_context if retrieved_context is not None else retrieve_context(user_query)

    content = agent_complete(
        system_prompt=SYSTEM_PROMPT,
        user_query=user_query,
        retrieved_context=context,
        task=(
            "Provide a factual answer grounded strictly in the retrieved context. "
            "End with a 'Learn more' section listing the Reference URLs from the context."
        ),
        temperature=0.3,
        response_language=response_language,
    )

    return AgentOutput(
        agent_name="historian",
        content=content,
        metadata={"context_length": len(context)},
    )
