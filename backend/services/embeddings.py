from __future__ import annotations

from chromadb.api.types import EmbeddingFunction
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from services.config import get_settings


def get_embedding_function() -> EmbeddingFunction:
    """
    Return embedding function based on EMBEDDING_PROVIDER.

    - local: Chroma default ONNX model (no API key, works offline after first download)
    - openai: OpenAI embeddings API
    """
    settings = get_settings()
    provider = settings.embedding_provider.lower().strip()

    if provider == "openai":
        from services.config import get_openai_api_key

        return OpenAIEmbeddingFunction(
            api_key=get_openai_api_key(),
            model_name=settings.openai_embedding_model,
        )

    from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

    return DefaultEmbeddingFunction()
