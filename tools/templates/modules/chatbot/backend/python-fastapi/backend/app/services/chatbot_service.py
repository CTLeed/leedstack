import os
import re
import aiohttp
from typing import List, Dict

class ChatbotService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

    async def generate_response(self, message: str, history: List[Dict]) -> str:
        """
        Generate a chatbot response. Tries AI providers first,
        falls back to basic responses if no API keys configured.
        """
        # Try LLM providers in order of preference
        if self.anthropic_api_key:
            return await self._generate_anthropic_response(message, history)

        if self.openai_api_key:
            return await self._generate_openai_response(message, history)

        # Fallback to basic rule-based responses
        return self._generate_basic_response(message)

    async def _generate_openai_response(self, message: str, history: List[Dict]) -> str:
        """Generate response using OpenAI API"""
        try:
            async with aiohttp.ClientSession() as session:
                messages = [
                    {"role": "system", "content": "You are a helpful assistant for this web application. Be concise and friendly."}
                ]
                messages.extend([{"role": msg.get("role"), "content": msg.get("content")} for msg in history])
                messages.append({"role": "user", "content": message})

                async with session.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {self.openai_api_key}"
                    },
                    json={
                        "model": "gpt-4o-mini",
                        "messages": messages,
                        "max_tokens": 500,
                        "temperature": 0.7
                    }
                ) as response:
                    if response.status != 200:
                        raise Exception(f"OpenAI API error: {response.status}")

                    data = await response.json()
                    return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"OpenAI error: {e}")
            return self._generate_basic_response(message)

    async def _generate_anthropic_response(self, message: str, history: List[Dict]) -> str:
        """Generate response using Anthropic API"""
        try:
            async with aiohttp.ClientSession() as session:
                messages = []
                messages.extend([{"role": msg.get("role"), "content": msg.get("content")} for msg in history])
                messages.append({"role": "user", "content": message})

                async with session.post(
                    "https://api.anthropic.com/v1/messages",
                    headers={
                        "Content-Type": "application/json",
                        "x-api-key": self.anthropic_api_key,
                        "anthropic-version": "2023-06-01"
                    },
                    json={
                        "model": "claude-3-5-haiku-20241022",
                        "max_tokens": 500,
                        "system": "You are a helpful assistant for this web application. Be concise and friendly.",
                        "messages": messages
                    }
                ) as response:
                    if response.status != 200:
                        raise Exception(f"Anthropic API error: {response.status}")

                    data = await response.json()
                    return data["content"][0]["text"]
        except Exception as e:
            print(f"Anthropic error: {e}")
            return self._generate_basic_response(message)

    def _generate_basic_response(self, message: str) -> str:
        """Generate basic rule-based response (no API key required)"""
        lower_message = message.lower()

        # Greeting patterns
        if re.search(r'(hello|hi|hey|greetings)', lower_message, re.IGNORECASE):
            return "Hello! I'm here to help. You can ask me questions about this application or configure me with an AI API key for more advanced responses."

        # Help patterns
        if re.search(r'(help|what can you do|how do you work)', lower_message, re.IGNORECASE):
            return "I can answer questions and assist you with this application. Currently, I'm running in basic mode. To unlock AI-powered responses, add OPENAI_API_KEY or ANTHROPIC_API_KEY to your backend .env file."

        # Feature questions
        if re.search(r'(feature|what|how)', lower_message, re.IGNORECASE):
            return "This is a full-stack web application with authentication, database integration, and more. Feel free to explore the codebase or ask me specific questions!"

        # API/Configuration questions
        if re.search(r'(api|configure|setup|install)', lower_message, re.IGNORECASE):
            return """To configure AI responses:

1. Get an API key from OpenAI or Anthropic
2. Add it to backend/.env:
   OPENAI_API_KEY=sk-...
   or
   ANTHROPIC_API_KEY=sk-ant-...
3. Restart the backend

Then I'll be powered by AI!"""

        # Thanks/Goodbye
        if re.search(r'(thank|thanks|bye|goodbye)', lower_message, re.IGNORECASE):
            return "You're welcome! Let me know if you need anything else."

        # Default fallback
        return "I received your message! I'm currently in basic mode with limited responses. For more intelligent conversations, configure an AI API key (OpenAI or Anthropic) in your backend environment variables."
