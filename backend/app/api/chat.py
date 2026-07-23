from fastapi import APIRouter
from pydantic import BaseModel
from app.llm import ask_llm

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("/ask")
def ask_ai(request: ChatRequest):

    response = ask_llm(
        request.message
    )

    return {
        "question": request.message,
        "answer": response
    }