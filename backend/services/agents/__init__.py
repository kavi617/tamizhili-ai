"""
Multi-agent pipeline for தமிழி AI.

Agents:
  - root_agent: Routes user intent and orchestrates the pipeline
  - historian_agent: RAG-grounded factual answers
  - character_agent: First-person historical figure responses
  - story_agent: Interactive narrative mode
  - validation_agent: Fact-checks output against retrieved context
"""

from services.agents.character import character_agent
from services.agents.combiner import combine_outputs
from services.agents.historian import historian_agent
from services.agents.root import root_agent
from services.agents.story import story_agent
from services.agents.types import AgentOutput, PipelineResult, QueryIntent
from services.agents.validation import validation_agent

__all__ = [
    "AgentOutput",
    "PipelineResult",
    "QueryIntent",
    "root_agent",
    "historian_agent",
    "character_agent",
    "story_agent",
    "validation_agent",
    "combine_outputs",
]
