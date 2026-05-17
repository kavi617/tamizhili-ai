from __future__ import annotations

import json
from pathlib import Path

SOURCES_FILE = (
    Path(__file__).resolve().parent.parent / "data" / "tamil_history" / "sources.json"
)


def load_sources_registry() -> dict[str, dict[str, str]]:
    if not SOURCES_FILE.is_file():
        return {}
    return json.loads(SOURCES_FILE.read_text(encoding="utf-8"))


def get_source_meta(filename: str) -> dict[str, str]:
    entry = load_sources_registry().get(filename, {})
    topic = entry.get("topic") or filename.replace("_", " ").replace(".txt", "").title()
    url = entry.get("url", "")
    return {"topic": topic, "url": url}


def format_source_links(chunks: list) -> str:
    """Build a Learn more section from chunk source URLs."""
    seen: set[str] = set()
    lines: list[str] = []
    for chunk in chunks:
        url = getattr(chunk, "source_url", None) or ""
        topic = getattr(chunk, "topic", "Source")
        if not url or url in seen:
            continue
        seen.add(url)
        lines.append(f"- {topic}: {url}")
    if not lines:
        return ""
    return "\n\nLearn more:\n" + "\n".join(lines)
