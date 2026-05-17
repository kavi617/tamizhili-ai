"""
Story Agent — turns verified facts into an interactive narrative for students.
"""
from __future__ import annotations

from services.agents.llm import agent_complete
from services.agents.types import AgentOutput

SYSTEM_PROMPT = """You are the Story Agent for தமிழி AI. Turn Tamil history into a short,
interactive narrative for students. Use scenes, dialogue, and sensory detail while staying
faithful to the retrieved context and historian facts. End with 1–2 questions that invite
the learner to explore further. Do not contradict the provided sources."""


def story_agent(
    user_query: str,
    *,
    historian_facts: str,
    retrieved_context: str,
    response_language: str = "en",
) -> AgentOutput:
    """Create an interactive narrative via GPT, grounded in RAG context and historian facts."""
    content = agent_complete(
        system_prompt=SYSTEM_PROMPT,
        user_query=user_query,
        retrieved_context=retrieved_context,
        task="Write an engaging historical story or scene based on the sources above.",
        temperature=0.85,
        extra_sections={"Historian verified facts": historian_facts},
        response_language=response_language,
    )

    return AgentOutput(
        agent_name="story",
        content=content,
        metadata={},
    )
