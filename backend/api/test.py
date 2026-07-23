from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="gpt-oss:120b",
    base_url="https://ollama.com",
    client_kwargs={
        "headers": {"Authorization": f"Bearer 4d901222a81d44c38373431388d8a020.MWuEfWHJjSGEsiMR_LaHjcWE"}
    },
    temperature=0.7,
)

agent = create_agent(
    model=llm,
    tools=[],  # vide pour un simple assistant conversationnel, on pourra en ajouter plus tard
    system_prompt="Tu es un assistant utile, clair et concis.",
)