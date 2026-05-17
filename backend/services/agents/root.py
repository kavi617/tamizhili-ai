"""
Root Agent — entry point for the multi-agent system.

Responsibilities:
  1. Retrieve context from ChromaDB (RAG)
  2. Classify user intent: fact | character | story
  3. Invoke Historian, then Character/Story if needed
  4. Run Validation Agent before returning the final answer
"""
from __future__ import annotations

import re

from services.agents.character import character_agent
from services.agents.historian import historian_agent
from services.agents.llm import agent_complete
from services.agents.story import story_agent
from services.agents.types import AgentOutput, PipelineResult, QueryIntent
from services.agents.validation import validation_agent
from services.config import get_settings
from services.retrieval import retrieve_context

CLASSIFY_SYSTEM = """You are the Root Agent router for தமிழி AI. Classify the user query into exactly one intent:
- fact: factual questions about Tamil history
- character: user wants to speak with or hear from a historical figure
- story: user wants a narrative, scene, or storytelling

Reply with only one word: fact, character, or story."""


def _detect_intent_heuristic(user_query: str) -> QueryIntent | None:
    q = user_query.lower()
    character_signals = (
        "speak as",
        "pretend to be",
        "you are",
        "as raja",
        "as a chola",
        "as a pandya",
        "in character",
        "talk to me as",
    )
    story_signals = (
        "tell me a story",
        "tell a story",
        "narrate",
        "once upon",
        "story about",
        "adventure",
        "imagine",
    )
    if any(s in q for s in character_signals) or re.search(
        r"\b(as|be)\s+(raja|king|poet|chola|pandya)\b", q
    ):
        return QueryIntent.CHARACTER
    if any(s in q for s in story_signals):
        return QueryIntent.STORY
    if q.endswith("?") or q.startswith(("what", "who", "when", "where", "why", "how", "which")):
        return QueryIntent.FACT
    return None


def classify_intent(user_query: str, *, retrieved_context: str) -> QueryIntent:
    """Use GPT to classify intent when heuristics are ambiguous."""
    label = agent_complete(
        system_prompt=CLASSIFY_SYSTEM,
        user_query=user_query,
        retrieved_context=retrieved_context,
        task="Output only: fact, character, or story.",
        temperature=0.0,
        add_language_directive=False,
    ).lower().strip()

    for intent in QueryIntent:
        if intent.value in label:
            return intent
    return QueryIntent.FACT


def root_agent(
    user_query: str,
    *,
    intent: QueryIntent | None = None,
    character_name: str | None = None,
    response_language: str = "en",
) -> PipelineResult:
    """
    Root Agent: orchestrates retrieval, specialist agents, and validation.

    Flow:
      1. Retrieve context from ChromaDB
      2. Classify intent (heuristic + GPT fallback)
      3. Historian Agent → factual base
      4. Character or Story Agent (if needed)
      5. Validation Agent → final checked response
    """
    query = user_query.strip()
    if not query:
        raise ValueError("user_query cannot be empty")

    context = retrieve_context(query)
    resolved_intent = intent or _detect_intent_heuristic(query) or classify_intent(
        query, retrieved_context=context
    )

    historian = historian_agent(
        query, retrieved_context=context, response_language=response_language
    )

    creative: AgentOutput | None = None
    if resolved_intent == QueryIntent.CHARACTER:
        creative = character_agent(
            query,
            historian_facts=historian.content,
            retrieved_context=context,
            character_name=character_name,
            response_language=response_language,
        )
        draft = creative.content
    elif resolved_intent == QueryIntent.STORY:
        creative = story_agent(
            query,
            historian_facts=historian.content,
            retrieved_context=context,
            response_language=response_language,
        )
        draft = creative.content
    else:
        draft = historian.content

    validation = validation_agent(
        query,
        draft_response=draft,
        historian_facts=historian.content,
        retrieved_context=context,
        response_language=response_language,
    )

    settings = get_settings()
    return PipelineResult(
        user_query=query,
        intent=resolved_intent,
        retrieved_context=context,
        historian=historian,
        creative=creative,
        validation=validation,
        final_response=validation.content,
        metadata={
            "model": settings.openai_chat_model,
            "response_language": response_language,
        },
    )


if __name__ == "__main__":
    import sys

    q = " ".join(sys.argv[1:]) or "What was the Chola navy known for?"
    result = root_agent(q)
    print(f"Intent: {result.intent.value}")
    print(f"Model: {result.metadata.get('model')}")
    print(f"Validation passed: {result.validation.metadata.get('passed')}")
    print(f"\n{result.final_response}")
