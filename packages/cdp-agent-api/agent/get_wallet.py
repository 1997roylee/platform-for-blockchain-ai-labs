import requests
from typing import Dict, Any, Optional
import json

def send_post_request(
    url: str,
    data: Dict[str, Any],
    headers: Optional[Dict[str, str]] = None,
    timeout: int = 30
) -> requests.Response:
    """
    Send POST request with error handling and response validation.
    
    Args:
        url: Target endpoint URL
        data: Request payload/body
        headers: Optional request headers
        timeout: Request timeout in seconds
    
    Returns:
        Response object from request
    """
    default_headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    # Merge default headers with custom headers
    request_headers = {**default_headers, **(headers or {})}
    
    try:
        # Send POST request
        response = requests.post(
            url=url,
            json=data,  # Automatically serializes dict to JSON
            headers=request_headers,
            timeout=timeout
        )
        
        # Raise for status codes >= 400
        response.raise_for_status()
        
        return response
        
    except requests.exceptions.RequestException as e:
        # Handle network/HTTP errors
        raise Exception(f"Request failed: {str(e)}") from e
    except json.JSONDecodeError as e:
        # Handle JSON parsing errors
        raise Exception(f"Invalid JSON response: {str(e)}") from e

def get_wallet(wallet_id: str) -> Dict[str, Any]:
    """
    Get wallet data from the CDP Agent API.
    
    Args:
        wallet_id: Wallet ID to retrieve
    
    Returns:
        Wallet data as a dictionary
    """
    # Define the API endpoint URL
    endpoint_url = f"http://localhost:3000/api/wallets/{wallet_id}"
    
    # Send GET request to the API
    response = send_post_request(endpoint_url, data={})
    
    # Parse JSON response
    wallet_data = response.json()
    
    return wallet_data