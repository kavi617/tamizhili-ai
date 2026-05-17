from __future__ import annotations

from services.agents.llm import agent_complete
from services.agents.types import PipelineResult

SYSTEM_PROMPT = """You are the Combiner for தமிழி AI. Merge specialist agent outputs into one clear,
student-friendly answer. Preserve accuracy from the historian and the tone of the character or
story agent when present. Do not add new facts. Remove redundancy, meta-commentary, and JSON.
Output only the final answer text."""


def combine_outputs(result: PipelineResult, *, response_language: str = "en") -> str:
    """
    Merge historian, creative (if any), and validation outputs into one clean response.
    """
    if result.creative is None:
        return _clean_text(result.validation.content)

    return agent_complete(
        system_prompt=SYSTEM_PROMPT,
        user_query=result.user_query,
        retrieved_context=result.retrieved_context,
        task="Produce one polished final answer for the student.",
        temperature=0.4,
        extra_sections={
            "Intent": result.intent.value,
            "Historian agent": result.historian.content,
            f"{result.creative.agent_name.title()} agent": result.creative.content,
            "Validation agent (checked draft)": result.validation.content,
        },
        response_language=response_language,
    )


def _clean_text(text: str) -> str:
    return text.strip().strip('"')
