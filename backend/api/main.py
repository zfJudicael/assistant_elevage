from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers import chat

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API FastAPI avec LangChain et Ollama pour un assistant IA spécialisé dans l'élevage de poulets de chair.",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def accueil():

    return {
        "message": "Assistant IA Élevage Poulet opérationnel"
    }

app.include_router(chat.router)