from functools import lru_cache
from cachetools import TTLCache
from typing import Dict, Optional
import time
import logging
from .initialize_agent import initialize_agent

# Create logger
logger = logging.getLogger(__name__)

# Create TTL cache with 1 hour expiry
agent_cache = TTLCache(maxsize=100, ttl=3600)

class AgentCache:
    def __init__(self):
        self.cache: Dict[str, tuple] = {}
        
    def get_agent(self, wallet_id: str) -> Optional[tuple]:
        if wallet_id in self.cache:
            agent, timestamp = self.cache[wallet_id]
            # Check if cache entry is still valid (1 hour TTL)
            if time.time() - timestamp < 3600:
                logger.debug(f"Cache hit for wallet_id: {wallet_id}")
                return agent
            
        return None

    def set_agent(self, wallet_id: str, agent: any) -> None:
        self.cache[wallet_id] = (agent, time.time())
        logger.debug(f"Cached agent for wallet_id: {wallet_id}")

# Create singleton cache instance
agent_cache_instance = AgentCache()

def initialize_agent_with_cache(wallet_id: str = None):
    """Initialize agent with caching support"""
    
    # print("hi")
    # Try to get from cache first
    cached_agent = agent_cache_instance.get_agent(wallet_id)
    if cached_agent is not None:
        return cached_agent

    # Initialize new agent if not in cache
    agent = initialize_agent(wallet_id)
    # Cache the new agent
    agent_cache_instance.set_agent(wallet_id, agent)
    
    return agent

# Alternative using built-in lru_cache
# @lru_cache(maxsize=100)
# def initialize_agent_lru(wallet_id: str = None):
#     """Initialize agent with simple LRU cache"""
#     return initialize_agent(wallet_id)