# ==========================================
# rag.py
# Système RAG Assistant IA Élevage Poulet
# ==========================================


from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_community.vectorstores import Chroma


# ==========================================
# Configuration
# ==========================================c


DB_PATH = "./chroma_db"



embedding_model = HuggingFaceEmbeddings(

    model_name="sentence-transformers/all-MiniLM-L6-v2"

)



# ==========================================
# Chargement document PDF
# ==========================================

def charger_document(path:str):


    loader = PyPDFLoader(path)


    documents = loader.load()


    return documents





# ==========================================
# Découpage document
# ==========================================

def decouper_documents(documents):


    splitter = RecursiveCharacterTextSplitter(

        chunk_size=1000,

        chunk_overlap=200

    )


    chunks = splitter.split_documents(
        documents
    )


    return chunks





# ==========================================
# Création base vectorielle ChromaDB
# ==========================================

def creer_vectorstore(chunks):


    vectorstore = Chroma.from_documents(

        documents=chunks,

        embedding=embedding_model,

        persist_directory=DB_PATH

    )


    return vectorstore





# ==========================================
# Recherche information
# ==========================================

def rechercher_information(question:str):


    vectorstore = Chroma(

        persist_directory=DB_PATH,

        embedding_function=embedding_model

    )


    resultats = vectorstore.similarity_search(

        question,

        k=3

    )


    contexte = "\n\n".join(

        [
            doc.page_content 
            for doc in resultats
        ]

    )


    return contexte
