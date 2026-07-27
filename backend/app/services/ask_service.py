from app.agents.graph import graph

def ask_agent(conversation_id: str, question: str):

    result = graph.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": question
                }
            ]
        },
        config={
            "configurable": {
                "thread_id": conversation_id
            }
        }
    )

    print("Response from agent:", result)

    return result["messages"][-1].content