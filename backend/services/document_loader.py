from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from services.sources import get_source_meta

DEFAULT_DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "tamil_history"


@dataclass(frozen=True)
class HistoryDocument:
    filename: str
    topic: str
    content: str
    path: Path
    source_url: str = ""


@dataclass(frozen=True)
class TextChunk:
    text: str
    source_file: str
    topic: str
    chunk_index: int
    source_url: str = ""


def load_history_documents(data_dir: Path | None = None) -> list[HistoryDocument]:
    """Load all .txt files from the Tamil history data directory."""
    directory = data_dir or DEFAULT_DATA_DIR
    if not directory.is_dir():
        raise FileNotFoundError(f"Data directory not found: {directory}")

    documents: list[HistoryDocument] = []
    for file_path in sorted(directory.glob("*.txt")):
        content = file_path.read_text(encoding="utf-8").strip()
        if not content:
            continue
        meta = get_source_meta(file_path.name)
        documents.append(
            HistoryDocument(
                filename=file_path.name,
                topic=meta["topic"],
                content=content,
                path=file_path,
                source_url=meta.get("url", ""),
            )
        )
    return documents


def _split_into_paragraphs(text: str) -> list[str]:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    return paragraphs if paragraphs else [text.strip()]


def _split_long_paragraph(paragraph: str, chunk_size: int) -> list[str]:
    sentences = re.split(r"(?<=[.!?])\s+", paragraph)
    parts: list[str] = []
    current = ""

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
        candidate = f"{current} {sentence}".strip() if current else sentence
        if len(candidate) <= chunk_size:
            current = candidate
        else:
            if current:
                parts.append(current)
            if len(sentence) <= chunk_size:
                current = sentence
            else:
                for i in range(0, len(sentence), chunk_size):
                    parts.append(sentence[i : i + chunk_size])
                current = ""
    if current:
        parts.append(current)
    return parts


def chunk_text(
    text: str,
    *,
    chunk_size: int = 400,
    chunk_overlap: int = 50,
) -> list[str]:
    """Split text into smaller overlapping chunks suitable for embedding."""
    if chunk_size <= 0:
        raise ValueError("chunk_size must be positive")
    if chunk_overlap < 0 or chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap must be >= 0 and less than chunk_size")

    raw_chunks: list[str] = []
    for paragraph in _split_into_paragraphs(text):
        if len(paragraph) <= chunk_size:
            raw_chunks.append(paragraph)
        else:
            raw_chunks.extend(_split_long_paragraph(paragraph, chunk_size))

    if not raw_chunks:
        return []

    merged: list[str] = []
    buffer = ""
    for piece in raw_chunks:
        candidate = f"{buffer}\n\n{piece}".strip() if buffer else piece
        if len(candidate) <= chunk_size:
            buffer = candidate
        else:
            if buffer:
                merged.append(buffer)
            buffer = piece
    if buffer:
        merged.append(buffer)

    if chunk_overlap == 0 or len(merged) <= 1:
        return merged

    overlapped: list[str] = [merged[0]]
    for i in range(1, len(merged)):
        prev = merged[i - 1]
        prefix = prev[-chunk_overlap:].strip()
        combined = f"{prefix} {merged[i]}".strip() if prefix else merged[i]
        overlapped.append(combined)
    return overlapped


def chunk_documents(
    documents: list[HistoryDocument],
    *,
    chunk_size: int = 400,
    chunk_overlap: int = 50,
) -> list[TextChunk]:
    """Chunk each loaded document into embedding-ready pieces."""
    chunks: list[TextChunk] = []
    for doc in documents:
        for index, text in enumerate(
            chunk_text(doc.content, chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        ):
            chunks.append(
                TextChunk(
                    text=text,
                    source_file=doc.filename,
                    topic=doc.topic,
                    chunk_index=index,
                    source_url=doc.source_url,
                )
            )
    return chunks


def load_and_chunk_history(
    data_dir: Path | None = None,
    *,
    chunk_size: int = 400,
    chunk_overlap: int = 50,
) -> list[TextChunk]:
    """Load all history files and return text chunks for embedding."""
    documents = load_history_documents(data_dir)
    return chunk_documents(
        documents,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )


if __name__ == "__main__":
    docs = load_history_documents()
    chunks = chunk_documents(docs)
    print(f"Loaded {len(docs)} documents, produced {len(chunks)} chunks.\n")
    for doc in docs:
        doc_chunks = [c for c in chunks if c.source_file == doc.filename]
        print(f"- {doc.topic} ({doc.filename}): {len(doc_chunks)} chunks")
