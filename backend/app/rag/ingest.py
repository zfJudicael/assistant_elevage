"""
Étape 2 — Ingestion des documents de référence dans une base vectorielle (Chroma).

Usage:
    1. Place tes PDFs (guides Cobb 500, Ross 308, FAO, etc.) dans le dossier
       défini par settings.KNOWLEDGE_DOCS_DIR (par défaut ./data/knowledge_docs/)
    2. Lance: python -m rag.ingest
"""
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.core.config import settings
from .vectorstore import get_vectorstore

def ingest_documents():
    docs_dir = Path(settings.KNOWLEDGE_DOCS_DIR)
    docs_dir.mkdir(parents=True, exist_ok=True)

    pdf_files = list(docs_dir.glob("*.pdf"))
    if not pdf_files:
        print(f"Aucun PDF trouvé dans {docs_dir}. Ajoute tes guides (Cobb, Ross, FAO...) et relance.")
        return

    all_chunks = []
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)

    for pdf_path in pdf_files:
        print(f"Chargement: {pdf_path.name}")
        loader = PyPDFLoader(str(pdf_path))
        pages = loader.load()

        # On tague chaque chunk avec sa source, utile pour citer la provenance
        for page in pages:
            page.metadata["source_file"] = pdf_path.name

        chunks = splitter.split_documents(pages)
        all_chunks.extend(chunks)
        print(f"  -> {len(chunks)} chunks")

    print(f"Total: {len(all_chunks)} chunks. Génération des embeddings...")

    vectorstore = get_vectorstore()
    vectorstore.add_documents(all_chunks)

    print(f"Base vectorielle mise à jour dans {settings.VECTORSTORE_DIR}")


# if __name__ == "__main__":
#     ingest_documents()
