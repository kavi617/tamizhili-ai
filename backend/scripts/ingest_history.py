"""Embed Tamil history chunks and store them in ChromaDB."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv()

from services.vector_store import collection_count, get_chroma_path, ingest_tamil_history


def main() -> None:
    count = ingest_tamil_history(reset=False)
    print(f"Upserted {count} chunks.")
    print(f"Persisted at: {get_chroma_path()}")
    print(f"Collection size: {collection_count()}")


if __name__ == "__main__":
    main()
