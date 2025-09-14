from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.chatbot_service import ChatbotService

router = APIRouter()
chatbot_service = ChatbotService()

@router.post("/query")
async def query_stock(
    query: str,
    db: Session = Depends(get_db)
):
    """Process natural language queries about stock"""
    return await chatbot_service.process_query(query, db)

@router.get("/suggestions")
async def get_suggestions(db: Session = Depends(get_db)):
    """Get AI-powered suggestions for stock management"""
    return await chatbot_service.get_suggestions(db)

@router.post("/reorder-alerts")
async def check_reorder_alerts(db: Session = Depends(get_db)):
    """Check and generate reorder alerts"""
    return await chatbot_service.generate_reorder_alerts(db)