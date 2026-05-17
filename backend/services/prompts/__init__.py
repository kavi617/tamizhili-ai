"""Load shared GPT instruction files."""

from pathlib import Path

_PROMPTS_DIR = Path(__file__).resolve().parent


def load_tutor_instructions() -> str:
    path = _PROMPTS_DIR / "tutor_instructions.txt"
    if not path.is_file():
        return ""
    return path.read_text(encoding="utf-8").strip()
