from langchain.agents import create_agent

from app.llm.llm import get_llm
from app.rag.tools import search_knowledge

from langgraph.checkpoint.sqlite import SqliteSaver

from app.rag.checkpointer import get_checkpointer

memory = SqliteSaver.from_conn_string("checkpoints.db")

graph = create_agent(
    model=get_llm(),
    tools=[
        search_knowledge
    ],
    system_prompt="""
        You are Akoho.

        You are a helpful assistant specialized in poultry farming.

        Whenever the user asks something about poultry, ALWAYS consult search_knowledge first.

        If the information is not found,
        say that you don't know.

        Always answer in the user's language.
    """,
    checkpointer=get_checkpointer()
)