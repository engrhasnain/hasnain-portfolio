import time
from collections import defaultdict, deque
from threading import Lock


class RateLimiter:
    """Sliding-window limiter kept in memory.

    Good enough for a portfolio contact form: on serverless hosts each instance has its own
    memory, so treat it as a speed bump for spam, not a hard guarantee.
    """

    def __init__(self, limit: int, window_seconds: int = 3600) -> None:
        self.limit = limit
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > self.window:
                hits.popleft()
            if len(hits) >= self.limit:
                return False
            hits.append(now)
            return True

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()
