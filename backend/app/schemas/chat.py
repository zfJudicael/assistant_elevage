"""Schémas Pydantic pour les discussions (Chat)."""
from datetime import datetime

from pydantic import BaseModel

class ChatBase(BaseModel):
    message: str
    role: str = "user"


class ChatPayload(ChatBase):
    """Message de l'utilisateur"""

class ChatMessage(ChatBase):
    id: int
    date: datetime

class ChatOut(ChatBase):
    id: int
    role: str
    content: str
    created_at: datetime
