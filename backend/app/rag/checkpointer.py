from langgraph.checkpoint.sqlite import SqliteSaver
import sqlite3

def get_checkpointer() -> SqliteSaver:
    conn = sqlite3.connect("checkpoints.db", check_same_thread=False)
    return SqliteSaver(conn)