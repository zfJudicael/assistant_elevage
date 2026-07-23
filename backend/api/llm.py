from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from core.config import settings

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

    response = agent.invoke({
        "messages": [{"role": "user", "content": question}]
    })

    return response["messages"][-1].content_blocks