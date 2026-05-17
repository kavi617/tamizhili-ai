from __future__ import annotations

from schemas import ChatResponse, PipelineStepOut
from services.agents.combiner import combine_outputs
from services.agents.root import root_agent
from services.agents.types import PipelineResult, QueryIntent
from services.config import use_local_llm
from services.local_llm import local_answer


def _steps_local_rag() -> list[PipelineStepOut]:
    """Steps only when LLM_PROVIDER=local."""
    return [
        PipelineStepOut(id="root", label="Root Agent · Orchestration"),
        PipelineStepOut(id="rag", label="RAG · Context retrieval"),
        PipelineStepOut(
            id="synthesis",
            label="Local synthesis · Archive answer",
        ),
    ]


def _steps_cloud_pipeline(
    result: PipelineResult,
    *,
    composer_used_llm: bool,
) -> list[PipelineStepOut]:
    specialist_label = {
        QueryIntent.FACT: "Character / Story agent · Skipped (fact mode)",
        QueryIntent.CHARACTER: "Character Agent",
        QueryIntent.STORY: "Story Agent",
    }[result.intent]

    composer_label = (
        "Response Composer · Merge specialist outputs"
        if composer_used_llm
        else "Finalize · Validation output"
    )

    return [
        PipelineStepOut(id="root", label="Root Agent · Orchestration"),
        PipelineStepOut(id="rag", label="RAG · Context retrieval"),
        PipelineStepOut(id="classifier", label="Intent classifier"),
        PipelineStepOut(id="historian", label="Historian Agent"),
        PipelineStepOut(id="specialist", label=specialist_label),
        PipelineStepOut(id="validation", label="Validation Agent"),
        PipelineStepOut(id="composer", label=composer_label),
    ]


def run_pipeline(
    user_input: str,
    *,
    intent: QueryIntent | str | None = None,
    character_name: str | None = None,
    response_language: str = "en",
) -> ChatResponse:
    """
    Multi-agent GPT pipeline. Archive-only answers apply only when LLM_PROVIDER=local.
    No silent fallback to archives when OpenAI is configured.
    """
    if use_local_llm():
        return ChatResponse(
            response=local_answer(
                user_input.strip(),
                response_language=response_language,
            ),
            steps=_steps_local_rag(),
            intent=None,
        )

    resolved_intent: QueryIntent | None = None
    if intent is not None:
        resolved_intent = (
            intent if isinstance(intent, QueryIntent) else QueryIntent(str(intent).lower())
        )

    result = root_agent(
        user_input,
        intent=resolved_intent,
        character_name=character_name,
        response_language=response_language,
    )
    composer_used_llm = result.creative is not None
    final = combine_outputs(result, response_language=response_language)
    return ChatResponse(
        response=final,
        steps=_steps_cloud_pipeline(result, composer_used_llm=composer_used_llm),
        intent=result.intent.value,
    )
