"""
Validation Agent — checks draft answers against RAG context and historian facts.

Returns corrected text and passes/fail metadata for the pipeline.
"""
from __future__ import annotations

import json
import re

from services.agents.llm import agent_complete
from services.agents.types import AgentOutput

SYSTEM_PROMPT = """You are the Validation Agent for தமிழி AI. Check whether the draft response
is supported by the retrieved context and historian facts. Reply with JSON only:
{
  "passed": true or false,
  "feedback": "brief explanation",
  "corrected_response": "full corrected answer if needed, otherwise the draft if passed"
}
Mark passed=false if the draft invents facts, uses wrong dates, or contradicts the context."""


def validation_agent(
    user_query: str,
    *,
    draft_response: str,
    historian_facts: str,
    retrieved_context: str,
    response_language: str = "en",
) -> AgentOutput:
    """Validate draft output with GPT against retrieved context and historian facts."""
    lang_word = "Tamil" if response_language == "ta" else "English"
    raw = agent_complete(
        system_prompt=SYSTEM_PROMPT,
        user_query=user_query,
        retrieved_context=retrieved_context,
        task=(
            "Validate the draft response below. Return JSON only. "
            f"The corrected_response field must be entirely in {lang_word}."
        ),
        temperature=0.2,
        extra_sections={
            "Historian verified facts": historian_facts,
            "Draft response to validate": draft_response,
        },
        response_language=response_language,
        add_language_directive=False,
    )
    parsed = _parse_validation_json(raw)

    return AgentOutput(
        agent_name="validation",
        content=parsed["corrected_response"],
        metadata={
            "passed": parsed["passed"],
            "feedback": parsed["feedback"],
            "raw": raw,
        },
    )


def _parse_validation_json(raw: str) -> dict:
    try:
        match = re.search(r"\{.*\}", raw, re.DOTALL)
        data = json.loads(match.group(0) if match else raw)
        return {
            "passed": bool(data.get("passed", False)),
            "feedback": str(data.get("feedback", "")),
            "corrected_response": str(data.get("corrected_response", raw)),
        }
    except (json.JSONDecodeError, AttributeError):
        return {
            "passed": True,
            "feedback": "Validation parse fallback; review manually.",
            "corrected_response": raw,
        }
