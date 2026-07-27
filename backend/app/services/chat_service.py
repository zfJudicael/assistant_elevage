from sqlalchemy import Uuid
from sqlalchemy.orm import Session

from app.db.models import ChatMessage
from app.db.models import Message
from app.schemas import chat as schemas

def save_msg(db: Session, conversation_id: Uuid, payload: schemas.ChatPayload) -> Message:
    message = Message(
        conversation_id=conversation_id,
        role="assistant" if payload.role == "assistant" else "user",
        content=payload.message
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
