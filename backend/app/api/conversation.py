from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.services.conversation_service import create_conversation


router = APIRouter(prefix="/conversation", tags=["Conversation"])

@router.post("/new/gobal")
def new_conversation(db: Session = Depends(get_db)):
    """
    Création d'une nouvelle conversation et retourne son ID.
    """

    conversation_id = create_conversation(db, type="global")

    return {
        "conversation_id": conversation_id
    }

@router.post("/new/group/{group_id}")
def new_conversation(db: Session = Depends(get_db)):
    """
    Création d'une nouvelle conversation et retourne son ID.
    """

    conversation_id = create_conversation(db, type="group")

    return {
        "conversation_id": conversation_id
    }