from langchain_chroma import Chroma
from app.core.config import settings
from .embeddings import get_embeddings

def get_vectorstore():
    return Chroma(
        collection_name="pounder_knowledge",
        embedding_function=get_embeddings(),
        persist_directory=settings.VECTORSTORE_DIR,
    )