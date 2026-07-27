import uuid

from sqlalchemy.orm import Session
from datetime import datetime
from app.db.models import Conversation, ConversationType

def create_conversation(db: Session, type: ConversationType) -> Conversation:
    now = datetime.now()
    conversation = Conversation(
        title=f"Conversation - {now}",
        type=type,
        created_at=now
    )
    db.add(conversation)
    db.commit()

    return conversation.id