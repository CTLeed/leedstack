from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.chatbot_service import ChatbotService

router = APIRouter()
chatbot_service = ChatbotService()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

@router.post("")
async def chat(request: ChatRequest):
    """
    Chat endpoint that works with or without AI API keys.
    Falls back to basic responses if no API key is configured.
    """
    try:
        if not request.message or not isinstance(request.message, str):
            raise HTTPException(status_code=400, detail="Message is required")

        response = await chatbot_service.generate_response(
            request.message,
            request.history
        )

        return {"message": response}
    except Exception as e:
        print(f"Chatbot error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Sorry, I encountered an error. Please try again."
        )
