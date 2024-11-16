from .one_inch import CheckPriceAction
from .blockscout import CheckTokenDetailAction

action_lists = {
    "1inch": CheckPriceAction,
    "trade": CheckTokenDetailAction
}


def get_actions(agent_id: str):
    if agent_id in action_lists:
        return action_lists[agent_id]

    return None
