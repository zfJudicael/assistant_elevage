import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("APP_NAME", "AI Agent API")
    
    # LLM Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_API_KEY: str = os.getenv("OLLAMA_API_KEY", "")
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "gemma4:31b")
    TEMPERATURE: float = float(os.getenv("MODEL_TEMPERATURE", 0.7))
    TOP_P: float = float(os.getenv("TOP_P", 0.9))
    TOP_K: int = int(os.getenv("TOP_K", 40))

settings = Settings()