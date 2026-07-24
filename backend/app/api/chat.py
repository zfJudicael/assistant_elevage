from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas import chat as schemas
from app.services.chat_service import save_message

from app.llm.llm import ask_agent


router = APIRouter(prefix="/group", tags=["Chat"])

@router.post("/{group_id}/chat")
def chat_endpoint(group_id: int, payload: schemas.ChatPayload, db: Session = Depends(get_db)):
    try:
        # Sauvegarde du message utilisateur dans l'historique.
        save_message(db, group_id, payload)

        response = ask_agent(payload.message)

        save_message(db, group_id, schemas.ChatPayload(message=response, role="assistant"))

        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))