import requests
from pydantic import BaseModel, Field
from collections.abc import Callable
import os
from cdp_agentkit_core.actions import CdpAction


# def get_whitelisted_token_prices():
#     url = "https://api.1inch.dev/price/v1.1/1"

#     response = requests.get(
#         url,  headers={'Authorization': f'Bearer '+os.getenv("1NCH_KEY")})
#     if response.status_code == 200:
#         prices = response.json()
#         print("Prices for whitelisted tokens:")
#         for token_address, price in prices.items():
#             print(f"{token_address}: {price}")
#     else:
#         print("Failed to fetch token prices.")


def get_requested_token_prices(tokens):
    url = "https://api.1inch.dev/price/v1.1/1"

    payload = {
        "tokens": tokens, "currency": "USD"
    }

    response = requests.post(url, headers={'Authorization': f'Bearer '+os.getenv("1NCH_KEY")}, json=payload
                             )
    
    result = ""

    if response.status_code == 200:
        prices = response.json()
        
        print("Prices for requested tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
            result += f"Token Address: {token_address}\nPrice: {price} USD\n"
    else:
        print("Failed to fetch token prices.")
        result = "Failed to fetch token prices."
    return result


def get_prices_for_addresses(addresses):
    url = f"https://api.1inch.dev/price/v1.1/1/{','.join(addresses)}"

    response = requests.get(
        url,  headers={'Authorization': f'Bearer '+os.getenv("1NCH_KEY")})
    if response.status_code == 200:
        prices = response.json()
        result = ""
        for token_address, price in prices.items():
            result += f"Token Address: {token_address} \n USD: {price}\n"
        return result
    else:
        # print("Failed to fetch token prices.")
        return "Failed to fetch token prices."


CHECK_PRICE_PROMPT = """
This tool will check the token price onchain. It takes the address of the token as inputs."""

class CheckPriceInput(BaseModel):
    """Input argument schema for deploy NFT action."""

    address: str = Field(
        ...,
        description="The address of the Token to check, e.g. `Solana`",
    )
    # symbol: str = Field(
    #     ...,
    #     description="The symbol of the token to check, e.g. `SOL`",
    # )


def check_price(address: str) -> str:
    """Check the price of a token onchakn.

    Args:
        Address (str): The Address of the Token to check, e.g. `0x111111111117dc0aa78b770fa6a738034120c302

    Returns:
        str: A current price (USD) of the token

    """
    try:
        price = get_requested_token_prices(tokens=address)
        print(price)
    except Exception as e:
        return f"Error checking price {e!s}"

    return price


class CheckPriceAction(CdpAction):
    """Check Price By 1Inch."""

    name: str = "check_price"
    description: str = CHECK_PRICE_PROMPT
    args_schema: type[BaseModel] | None = CheckPriceInput
    func: Callable[..., str] = check_price
