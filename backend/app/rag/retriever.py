from .vectorstore import get_vectorstore

def get_retriever():
    return get_vectorstore().as_retriever(
        search_kwargs={
            "k": 4
        }
    )