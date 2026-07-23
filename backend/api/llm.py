import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

load_dotenv()

llm = ChatOllama(
    model=os.getenv("DEFAULT_MODEL"),
    temperature=1,
    top_p=0.95,
    top_k=64,
    api_key=os.getenv("OLLAMA_API_KEY"),
    base_url=os.getenv("OLLAMA_BASE_URL"),
)

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="Your name is Akoho.You are a helpful assistant specialized in poultry farming. You provide accurate and concise answers to questions related to raising broiler chickens, including feeding, health, housing, and management practices."
)

def ask_llm(question: str):
    """
    Fonction qui envoie une question au LLM
    et retourne la réponse.
    """

    response = agent.invoke({
        "messages": [{"role": "user", "content": question}]
    })

    return response["messages"][-1].content_blocks