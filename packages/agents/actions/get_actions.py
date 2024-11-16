from .one_inch import CheckPriceAction
from .blockscout import CheckTokenDetailAction
from .uniswap import CreateSwapAction

action_lists = {
    "1inch": CheckPriceAction,
    "trade": CheckTokenDetailAction,
    "uniswap": CreateSwapAction,
}


def get_actions(agent_id: str):
    if agent_id in action_lists:
        return action_lists[agent_id]

    return None
