from fastapi import FastAPI
from pydantic import BaseModel

from llm import ask_llm


app = FastAPI(
    title="Assistant IA Élevage Poulet de Chair",
    description="API FastAPI avec LangChain et Groq",
    version="1.0"
)


class QuestionRequest(BaseModel):
    question: str



@app.get("/")
def accueil():

    return {
        "message": "Assistant IA Élevage Poulet opérationnel"
    }



@app.post("/ask")
def ask_ai(request: QuestionRequest):

    answer = ask_llm(
        request.question
    )

    return {
        "question": request.question,
        "answer": answer
    }