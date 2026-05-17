from __future__ import annotations

from dataclasses import dataclass

from services.vector_store import get_collection

DEFAULT_TOP_K = 5
MIN_TOP_K = 3
MAX_TOP_K = 5


@dataclass(frozen=True)
class RetrievedChunk:
    text: str
    source_file: str
    topic: str
    chunk_index: int
    source_url: str = ""
    distance: float | None = None


def retrieve_relevant_chunks(
    query: str,
    *,
    top_k: int = DEFAULT_TOP_K,
) -> list[RetrievedChunk]:
    """
    Embed the user query and return the most relevant Tamil history chunks from ChromaDB.

    Args:
        query: User question or message.
        top_k: Number of chunks to return (3–5 recommended for LLM context).

    Returns:
        List of RetrievedChunk ordered by relevance (closest first).
    """
    query = query.strip()
    if not query:
        return []

    if top_k < MIN_TOP_K or top_k > MAX_TOP_K:
        raise ValueError(f"top_k must be between {MIN_TOP_K} and {MAX_TOP_K}")

    collection = get_collection()
    if collection.count() == 0:
        raise RuntimeError(
            "ChromaDB collection is empty. Run: python -m services.vector_store"
        )

    results = collection.query(
        query_texts=[query],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )

    documents = results.get("documents") or [[]]
    metadatas = results.get("metadatas") or [[]]
    distances = results.get("distances") or [[]]

    chunks: list[RetrievedChunk] = []
    for doc, meta, dist in zip(documents[0], metadatas[0], distances[0]):
        if not doc or not meta:
            continue
        chunks.append(
            RetrievedChunk(
                text=doc,
                source_file=str(meta.get("source_file", "")),
                topic=str(meta.get("topic", "")),
                chunk_index=int(meta.get("chunk_index", 0)),
                source_url=str(meta.get("source_url", "") or ""),
                distance=float(dist) if dist is not None else None,
            )
        )
    return chunks


def format_chunks_as_context(chunks: list[RetrievedChunk]) -> str:
    """Format retrieved chunks as a single context block for an LLM prompt."""
    if not chunks:
        return ""

    sections: list[str] = []
    for i, chunk in enumerate(chunks, start=1):
        link = f" | Reference: {chunk.source_url}" if chunk.source_url else ""
        sections.append(
            f"[{i}] Topic: {chunk.topic} (source: {chunk.source_file}){link}\n{chunk.text}"
        )
    return "\n\n".join(sections)


def retrieve_context(query: str, *, top_k: int = DEFAULT_TOP_K) -> str:
    """Retrieve relevant chunks and return them formatted for AI context."""
    chunks = retrieve_relevant_chunks(query, top_k=top_k)
    return format_chunks_as_context(chunks)


if __name__ == "__main__":
    import sys

    user_query = " ".join(sys.argv[1:]) or "Tell me about the Chola navy and temples"
    print(f"Query: {user_query}\n")
    for chunk in retrieve_relevant_chunks(user_query, top_k=5):
        print(f"--- {chunk.topic} ({chunk.source_file}) distance={chunk.distance:.4f}")
        print(chunk.text[:200] + ("..." if len(chunk.text) > 200 else ""))
        print()
