from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.analytics_service import AnalyticsService

router = APIRouter()
analytics_service = AnalyticsService()

@router.get("/stock-summary")
async def get_stock_summary(db: Session = Depends(get_db)):
    """Get overall stock summary"""
    return await analytics_service.get_stock_summary(db)

@router.get("/sales-trends")
async def get_sales_trends(days: int = 30, db: Session = Depends(get_db)):
    """Get sales trends over the specified number of days"""
    return await analytics_service.get_sales_trends(days, db)

@router.get("/demand-prediction")
async def get_demand_prediction(product_id: int, days_ahead: int = 7, db: Session = Depends(get_db)):
    """Get demand prediction for a product"""
    return await analytics_service.predict_demand(product_id, days_ahead, db)

@router.get("/inventory-turnover")
async def get_inventory_turnover(db: Session = Depends(get_db)):
    """Get inventory turnover metrics"""
    return await analytics_service.calculate_inventory_turnover(db)

@router.get("/stockout-risk")
async def get_stockout_risk(db: Session = Depends(get_db)):
    """Get products at risk of stockout"""
    return await analytics_service.get_stockout_risk(db)