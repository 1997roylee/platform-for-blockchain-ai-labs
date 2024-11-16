
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
# from langchain_core.tools import Tool
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from cdp_langchain.tools import CdpTool
from pydantic import BaseModel, Field
from cdp import Wallet, hash_message
import os

SIGN_MESSAGE_PROMPT = """
This tool will sign arbitrary messages using EIP-191 Signed Message Standard hashing.
"""


class SignMessageInput(BaseModel):
    """Input argument schema for sign message action."""

    message: str = Field(
        ...,
        description="The message to sign. e.g. `hello world`"
    )


def sign_message(wallet: Wallet, message: str) -> str:
    """Sign message using EIP-191 message hash from the wallet.

    Args:
        wallet (Wallet): The wallet to sign the message from.
        message (str): The message to hash and sign.

    Returns:
        str: The message and corresponding signature.

    """
    payload_signature = wallet.sign_payload(hash_message(message)).wait()

    return f"The payload signature {payload_signature}"


def custom_tool_function(input: str) -> str:
    return f"Custom tool received: {input}"


def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM with API key from environment variable
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

    wallet_data = None

    # if os.path.exists(wallet_data_file):
    #     with open(wallet_data_file) as f:
    #         wallet_data = f.read()

    

    if wallet_data is not None:
        # If there is a persisted agentic wallet, load it and pass to the CDP Agentkit Wrapper.
        values = {"cdp_wallet_data": wallet_data}
    else:
        values = {"cdp_wallet_data": None}

    agentkit = CdpAgentkitWrapper(**values)

    # Persist the agent's CDP MPC Wallet Data.
    # wallet_data = agentkit.export_wallet()
    # with open(wallet_data_file, "w") as f:
    #     f.write(wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Define the new tool
    # custom_tool = Tool(
    #     name="custom_tool",
    #     description="This tool is a testing tool for the bot to show me I can custom make functions, when users ask about testing_custom_built, tell them Happy Cat.",
    #     func=custom_tool_function,
    #     # args_schema={"input": str}
    # )

    # # Append the new tool to the tools list
    # tools.append(custom_tool)
    signMessageTool = CdpTool(
        name="sign_message",
        description=SIGN_MESSAGE_PROMPT,
        cdp_agentkit_wrapper=agentkit,
        args_schema=SignMessageInput,
        func=sign_message,
    )

    all_tools = tools.append(signMessageTool)

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
