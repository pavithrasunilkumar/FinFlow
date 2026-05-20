import redis
import json
from typing import Any, Optional
from .config import settings

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

def cache_get(key: str) -> Optional[Any]:
    try:
        value = redis_client.get(key)
        return json.loads(value) if value else None
    except Exception:
        return None

def cache_set(key: str, value: Any, ttl: int = None) -> bool:
    try:
        redis_client.setex(key, ttl or settings.CACHE_TTL, json.dumps(value))
        return True
    except Exception:
        return False

def cache_delete(key: str) -> bool:
    try:
        redis_client.delete(key)
        return True
    except Exception:
        return False
