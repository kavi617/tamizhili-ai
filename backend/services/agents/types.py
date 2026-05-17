from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class QueryIntent(str, Enum):
    FACT = "fact"
    CHARACTER = "character"
    STORY = "story"


@dataclass
class AgentOutput:
    agent_name: str
    content: str
    metadata: dict = field(default_factory=dict)


@dataclass
class PipelineResult:
    user_query: str
    intent: QueryIntent
    retrieved_context: str
    historian: AgentOutput
    creative: AgentOutput | None
    validation: AgentOutput
    final_response: str
    metadata: dict = field(default_factory=dict)
