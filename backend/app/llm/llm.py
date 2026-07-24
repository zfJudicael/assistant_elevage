from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage

from app.core.config import settings

llm = ChatOllama(
    model=settings.DEFAULT_MODEL,
    temperature=settings.TEMPERATURE,
    top_p=settings.TOP_P,
    top_k=settings.TOP_K,
    api_key=settings.OLLAMA_API_KEY,
    base_url=settings.OLLAMA_BASE_URL,
)

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="Your name is Akoho.You are a helpful assistant specialized in poultry farming. You provide accurate and concise answers to questions related to raising broiler chickens, including feeding, health, housing, and management practices."
)

def ask_agent(question: str):
    """
    Fonction qui envoie une question à l'agent et retourne la réponse.
    """

    # Formatage du message utilisateur pour LangGraph.
    message = {
        "messages": [{"role": "user", "content": HumanMessage(content=question)}]
    }

    response = agent.invoke(message)

    return response["messages"][-1].content_blocks


# print(response.content)
# from dotenv import load_dotenv
# import os

# from langchain_groq import ChatGroq


# # Charger les variables d'environnement
# load_dotenv()


# # Initialisation du modèle Groq
# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     api_key=os.getenv("GROQ_API_KEY"),
#     temperature=0
# )


# def ask_llm(question: str):
#     """
#     Fonction qui envoie une question au LLM
#     et retourne la réponse.
#     """

#     response = llm.invoke(question)

#     return response.content