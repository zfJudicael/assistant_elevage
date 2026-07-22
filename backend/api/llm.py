
# from dotenv import load_dotenv
# import os

# from langchain_groq import ChatGroq


# load_dotenv()


# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     api_key=os.getenv("GROQ_API_KEY"),
#     temperature=0
# )


# response = llm.invoke(
#     "Explique la vaccination des poulets de chair"   
# )


# print(response.content)
from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq


# Charger les variables d'environnement
load_dotenv()


# Initialisation du modèle Groq
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)


def ask_llm(question: str):
    """
    Fonction qui envoie une question au LLM
    et retourne la réponse.
    """

    response = llm.invoke(question)

    return response.content