# AI Agents Platform

Platform for building, deploying and interacting with AI agents.

## Quick Start

```bash
# Install dependencies
poetry install
```

## Set environment variables
```bash
cp .env.example .env
```

## Start development server
```bash
poetry run uvicorn main:app --reload
```

## How to create a new agent

1. Create a new source file in the `actions` directory.
2. Implement a class that inherits from `CdpAction` and import it in actions/get_actions.py with agent id.