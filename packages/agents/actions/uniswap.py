from pydantic import BaseModel, Field
from collections.abc import Callable
from cdp_agentkit_core.actions import CdpAction


SWAP_PROMPT = """
This tool will create swap form by uniswap. It takes the address of the token as inputs and output."""


class SwapInput(BaseModel):
    """Input argument schema for create Swap action."""

    address_in: str = Field(
        ...,
        description="The address of the Token to check, e.g. `0x0000`",
    )
    address_out: str = Field(
        ...,
        description="The address of the Token to check, e.g. `0x0000`",
    )
    # symbol: str = Field(
    # ...,
    # description="The symbol of the token to check, e.g. `SOL`",
    # )


def create_swap_form(address_in: str, address_out: str) -> str:
    """Check the price of a token onchakn.

    Args:
    Address In (str): The Address of the Token to check, e.g. `0x111111111117dc0aa78b770fa6a738034120c302
    Address Out (str): The Address of the Token to check, e.g. `0x111111111117dc0aa78b770fa6a738034120c302
    Returns:
    str: HTML

    """

    result = "'''html"
    result += f"<iframe src=\"https://app.uniswap.org/#/swap?inputCurrency={address_in}&outputCurrency={address_out}\" height=\"660px\" width=\"100%\" style=\" border: 0; margin: 0 auto; display: block; border-radius: 10px; max-width: 600px; min-width: 300px;\" />"
    result += "'''html"

    return result


class CreateSwapAction(CdpAction):
    """Create Uniswap."""

    name: str = "swap"
    description: str = SWAP_PROMPT
    args_schema: type[BaseModel] | None = SwapInput
    func: Callable[..., str] = create_swap_form
