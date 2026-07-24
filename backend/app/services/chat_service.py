from sqlalchemy.orm import Session

from app.db.models import ChatMessage
from app.schemas import chat as schemas

def save_message(db: Session, group_id: int, payload: schemas.ChatPayload) -> ChatMessage:
    message = ChatMessage(
        group_id=group_id,
        role="assistant" if payload.role == "assistant" else "user",
        message=payload.message
    )
    db.add(message)
    db.commit()
    return message
