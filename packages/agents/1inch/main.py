from dotenv import load_dotenv
from agent.run_agent import run_agent
from agent.cache_agent import initialize_agent_with_cache
from actions.check_price_action import CheckPriceAction

# Import CDP Agentkit Langchain Extension.
from pydantic import BaseModel
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
    wallet_id: str
    conversation_id: str


@app.post("/chat")
async def chat(user_input: UserInput):
    try:
        agent_executor = initialize_agent_with_cache(user_input.wallet_id, agent_klass=CheckPriceAction)
        config = {"configurable": {"thread_id": user_input.conversation_id}}
        return StreamingResponse(run_agent(user_input.message, agent_executor, config), media_type='text/event-stream')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
