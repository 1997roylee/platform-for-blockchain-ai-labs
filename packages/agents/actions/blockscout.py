import requests
from pydantic import BaseModel, Field
from collections.abc import Callable
from cdp_agentkit_core.actions import CdpAction

def search_tokens(tokens):
    url = "https://eth.blockscout.com/api/v2/search?q="+tokens

    response = requests.get(url)
    
    result = "'''html\n<div class=\"flex gap-3\">"

    if response.status_code == 200:
        token_details = response.json()

        for item in  token_details["items"][0:2]:
            print(item)
            result += "<div>"
            result += f"<img class=\"w-16 h-16 rounded-full\" src=\"{item['icon_url']}\" alt=""></img>"
            result += f"<div>Name: {item['name']}</div>"
            result += f"<div>Symbol: {item['symbol']}</div>"
            result += f"<div>Exchange Rate: {item['exchange_rate']}</div>"
            result += f"<div>MC: {item['circulating_market_cap']}</div>"
            result += f"<div>Total Supply: {item['total_supply']}</div>"

           
            result += "</div>"
        
        # print("Details for searched tokens:")
        # for token, detail in token_details.items()[0:2]:
        #     print(f"{token}: {detail['circulating_market_cap']}")

        #     result += f"{token}, MC: {detail}\n"
        # result = token_details["items"]
        result += "</div>'''html"
    else:
        print("Failed to fetch token detail.")
        result = "Failed to fetch token details."
    return result

# search_tokens("DOGE")


CHECK_TOKEN_DETAIL_PROMPT = """
This tool will check the token details onchain. It takes the symbol of the token as inputs."""


class CheckTokenDetailInput(BaseModel):
    """Input argument schema for checking token details"""

    symbol: str = Field(
        ...,
        description="The symbol of the Token to check, e.g. `DOGE`",
    )
    # symbol: str = Field(
    #     ...,
    #     description="The symbol of the token to check, e.g. `SOL`",
    # )


def check_token_detail(symbol: str) -> str:
    """Check the symbol of a token onchain.

    Args:
        Symbol (str): The symbol of the Token to check, e.g. `DOGE`

    Returns:
        str: Details of the token

    """
    try:
        token_detail = search_tokens(tokens=symbol)
    except Exception as e:
        return f"Error checking price {e!s}"

    return token_detail


class CheckTokenDetailAction(CdpAction):
    """Check Token Details"""

    name: str = "check_token_detail"
    description: str = CHECK_TOKEN_DETAIL_PROMPT
    args_schema: type[BaseModel] | None = CheckTokenDetailInput
    func: Callable[..., str] = check_token_detail