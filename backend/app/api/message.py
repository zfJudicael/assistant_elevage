import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import chat as schemas
from app.services.chat_service import save_msg

from app.services.ask_service import ask_agent


router = APIRouter(prefix="/message", tags=["Message"])
@router.post("/new/{conversation_id}")
def chat(conversation_id: uuid.UUID, payload: schemas.ChatPayload, db: Session = Depends(get_db)):
    """ 
    Envoie une question à l'agent et retourne la réponse.
    """
    save_msg(db, conversation_id, payload)
    answer = ask_agent(conversation_id, payload.message)
    response = save_msg(db, conversation_id, schemas.ChatPayload(message=answer, role="assistant"))


    return {
        "data": response
    }