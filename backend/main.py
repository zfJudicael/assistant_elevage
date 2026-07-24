import uuid

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine, Base
from app.api import groups, daily_logs, vaccinations, stats, conversation, message


# Crée les tables au démarrage si elles n'existent pas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API FastAPI avec LangChain et Ollama pour un assistant IA spécialisé dans l'élevage de poulets de chair.",
    version="1.0"              
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enregistrement des routeurs
app.include_router(groups.router)
app.include_router(daily_logs.router)
app.include_router(vaccinations.router)
app.include_router(stats.router)
app.include_router(conversation.router)
app.include_router(message.router)

@app.get("/", tags=["Root"])
def root():
    return {"message": settings.PROJECT_NAME, "docs": "/docs"}