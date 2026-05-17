from __future__ import annotations

import chromadb
from chromadb.api.types import EmbeddingFunction

from services.config import get_chroma_path, get_settings
from services.document_loader import TextChunk, load_and_chunk_history
from services.embeddings import get_embedding_function

COLLECTION_NAME = "tamil_history"

def ingest_if_empty():
    db_path = get_chroma_path()

    # check real DB folder
    if db_path.exists() and any(db_path.iterdir()):
        return

    ingest_tamil_history(reset=True)

def _chunk_id(chunk: TextChunk) -> str:
    return f"{chunk.source_file}::{chunk.chunk_index}"


def get_chroma_client() -> chromadb.PersistentClient:
    persist_path = get_chroma_path()
    persist_path.mkdir(parents=True, exist_ok=True)
    return chromadb.PersistentClient(path=str(persist_path))


def get_collection(
    client: chromadb.PersistentClient | None = None,
    *,
    embedding_function: EmbeddingFunction | None = None,
):
    settings = get_settings()
    chroma = client or get_chroma_client()
    embed_fn = embedding_function or get_embedding_function()
    return chroma.get_or_create_collection(
        name=settings.chroma_collection_name,
        embedding_function=embed_fn,
        metadata={"hnsw:space": "cosine"},
    )


def ingest_chunks(
    chunks: list[TextChunk],
    *,
    reset: bool = False,
) -> int:
    """Embed text chunks and store them in the persistent ChromaDB collection."""
    if not chunks:
        return 0

    settings = get_settings()
    client = get_chroma_client()
    embed_fn = get_embedding_function()

    if reset and settings.chroma_collection_name in {
        col.name for col in client.list_collections()
    }:
        client.delete_collection(settings.chroma_collection_name)

    collection = get_collection(client, embedding_function=embed_fn)

    ids = [_chunk_id(chunk) for chunk in chunks]
    documents = [chunk.text for chunk in chunks]
    metadatas = [
        {
            "source_file": chunk.source_file,
            "topic": chunk.topic,
            "chunk_index": chunk.chunk_index,
            "source_url": chunk.source_url or "",
        }
        for chunk in chunks
    ]

    collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
    return len(chunks)


def ingest_tamil_history(*, reset: bool = False) -> int:
    """Load history files, chunk them, embed, and persist to ChromaDB."""
    chunks = load_and_chunk_history()
    return ingest_chunks(chunks, reset=reset)


def collection_count() -> int:
    client = get_chroma_client()
    settings = get_settings()
    try:
        collection = get_collection()
        return collection.count()
    except Exception:
        return 0


if __name__ == "__main__":
    settings = get_settings()
    print(f"Embedding provider: {settings.embedding_provider}")
    count = ingest_tamil_history(reset=True)
    stored = collection_count()
    print(f"Ingested {count} chunks into collection '{COLLECTION_NAME}'.")
    print(f"Collection now has {stored} vectors at {get_chroma_path()}")
