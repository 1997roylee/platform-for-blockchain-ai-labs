import os
import sys
import time
from dotenv import load_dotenv
from agent.run_agent import run_agent
# from pathlib import Path

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import Tool
# Import CDP Agentkit Langchain Extension.
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from cdp_langchain.tools import CdpTool
from pydantic import BaseModel, Field

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

app = FastAPI()


# CORS (Cross-Origin Resource Sharing) middleware configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
load_dotenv()


class UserInput(BaseModel):
    message: str


@app.on_event("startup")
async def startup_event():
    global agent_executor, config
    agent_executor, config = initialize_agent()


@app.post("/chat/")
async def chat(user_input: UserInput):
    try:
        # response = []
        # for chunk in agent_executor.stream(
        #         {"messages": [HumanMessage(content=user_input.message)]}, config):
        #     if "agent" in chunk:
        #         response.append(chunk["agent"]["messages"][0].content)
        #     elif "tools" in chunk:
        #         response.append(chunk["tools"]["messages"][0].content)
        # return {"response": response}
        return StreamingResponse(run_agent(user_input.message, agent_executor, config), media_type='text/event-stream')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/autonomous/")
async def autonomous(interval: int = 10):
    try:
        run_autonomous_mode(agent_executor=agent_executor,
                            config=config, interval=interval)
        return {"status": "Autonomous mode started"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Configure a file to persist the agent's CDP MPC Wallet Data.
wallet_data_file = "wallet_data.txt"

# For testing

# Configure a file to persist the agent's CDP MPC Wallet Data.
# wallet_data_file = os.getenv("WALLET_DATA_FILE", "wallet_data.txt")

# def clean_private_key(key: str) -> str:
#     if not key:
#         raise ValueError("CDP_API_KEY_PRIVATE_KEY not found in environment variables")

#     return (key
#         .strip()
#         .replace('\\n', '\n')  # Handle escaped newlines
#         .replace('"', '')      # Remove quotes
#         .replace("'", "")      # Remove single quotes
#     )

# CDP_API_KEY_PRIVATE_KEY = clean_private_key(os.getenv("CDP_API_KEY_PRIVATE_KEY"))
# # Initialize CDP wrapper

# cdp = CdpAgentkitWrapper(cdp_api_key_private_key=CDP_API_KEY_PRIVATE_KEY)

# # Create toolkit from wrapper
# toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)


# Define a new tool function

def custom_tool_function(input: str) -> str:
    return f"Custom tool received: {input}"


def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM with API key from environment variable
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

    wallet_data = None

    if os.path.exists(wallet_data_file):
        with open(wallet_data_file) as f:
            wallet_data = f.read()

    if wallet_data is not None:
        # If there is a persisted agentic wallet, load it and pass to the CDP Agentkit Wrapper.
        values = {"cdp_wallet_data": wallet_data}
    else:
        values = {"cdp_wallet_data": None}

    agentkit = CdpAgentkitWrapper(**values)

    # Persist the agent's CDP MPC Wallet Data.
    wallet_data = agentkit.export_wallet()
    with open(wallet_data_file, "w") as f:
        f.write(wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Define the new tool
    custom_tool = Tool(
        name="custom_tool",
        description="This tool is a testing tool for the bot to show me I can custom make functions, when users ask about testing_custom_built, tell them Happy Cat.",
        func=custom_tool_function,
        # args_schema={"input": str}
    )

    # Append the new tool to the tools list
    tools.append(custom_tool)

    # tools.append(CustomTool(name=''testing_custom_built'', description=''\nThis tool is a testing tool for the bot to show me I can custom make functions, when users ask about testing_custom_built, tell them Happy Cat'', args_schema=''testing)'')')
    # print(tools)

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit Chatbot Example!"}}

    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    return create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier="You are a helpful agent that can interact onchain using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet if you are on network ID `base-sepolia`. If not, you can provide your wallet details and request funds from the user. If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more informaton. Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.",
    ), config


# Autonomous Mode
def run_autonomous_mode(agent_executor, config, interval=10):
    """Run the agent autonomously with specified intervals."""
    print("Starting autonomous mode...")
    while True:
        try:
            # Provide instructions autonomously
            pass
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(interval)

# Chat Mode


def run_chat_mode(agent_executor, config):
    """Run the agent interactively based on user input."""
    print("Starting chat mode... Type 'exit' to end.")
    while True:
        try:
            user_input = input("\nUser: ")
            if user_input.lower() == "exit":
                break

            # Run agent with the user's input in chat mode
            for chunk in agent_executor.stream(
                    {"messages": [HumanMessage(content=user_input)]}, config):
                if "agent" in chunk:
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)


# Mode Selection
def choose_mode():
    """Choose whether to run in autonomous or chat mode based on user input."""
    while True:
        print("\nAvailable modes:")
        print("1. chat    - Interactive chat mode")
        print("2. auto    - Autonomous action mode")

        choice = input(
            "\nChoose a mode (enter number or name): ").lower().strip()
        if choice in ["1", "chat"]:
            return "chat"
        elif choice in ["2", "auto"]:
            return "auto"
        print("Invalid choice. Please try again.")


def main():
    """Start the chatbot agent."""
    agent_executor, config = initialize_agent()

    mode = choose_mode()
    if mode == "chat":
        run_chat_mode(agent_executor=agent_executor, config=config)
    elif mode == "auto":
        run_autonomous_mode(agent_executor=agent_executor, config=config)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)