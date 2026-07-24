import uuid

from sqlalchemy.orm import Session
from datetime import datetime
from app.db.models import Conversation

def create_conversation(db: Session) -> Conversation:
    now = datetime.now()
    conversation = Conversation(
        title=f"Conversation - {now}",
        created_at=now
    )
    db.add(conversation)
    db.commit()

    return conversation.id