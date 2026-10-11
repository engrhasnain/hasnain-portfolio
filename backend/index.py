# Entry point for Vercel's zero-config FastAPI support (it looks for `app` in index.py).
from app.main import app

__all__ = ["app"]
