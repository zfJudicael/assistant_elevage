from langchain.tools import tool

from .retriever import get_retriever

retriever = get_retriever()

@tool
def search_knowledge(question: str) -> str:
    """
    Search poultry farming documentation.
    """

    docs = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    return context