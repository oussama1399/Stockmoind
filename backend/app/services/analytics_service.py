from datetime import datetime, timedelta
from typing import List, Dict
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from ..models import Product, StockItem, Transaction
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

class AnalyticsService:
    async def get_stock_summary(self, db: Session):
        """Get overall stock summary statistics"""
        total_products = db.query(Product).count()
        total_stock_value = db.query(
            func.sum(StockItem.quantity * Product.unit_price)
        ).join(Product).scalar() or 0
        
        low_stock_count = db.query(StockItem).join(Product).filter(
            StockItem.quantity <= Product.min_stock_level
        ).count()
        
        return {
            "total_products": total_products,
            "total_stock_value": total_stock_value,
            "low_stock_products": low_stock_count,
            "healthy_stock_products": total_products - low_stock_count
        }
    
    async def get_sales_trends(self, days: int, db: Session):
        """Get sales trends over the specified period"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        sales_data = db.query(
            func.date(Transaction.created_at).label('date'),
            func.sum(Transaction.quantity).label('total_quantity'),
            func.sum(Transaction.total_value).label('total_value')
        ).filter(
            Transaction.transaction_type == 'OUT',
            Transaction.created_at >= start_date
        ).group_by(func.date(Transaction.created_at)).all()
        
        return [
            {
                "date": str(row.date),
                "quantity": row.total_quantity,
                "value": row.total_value
            }
            for row in sales_data
        ]
    
    async def predict_demand(self, product_id: int, days_ahead: int, db: Session):
        """Predict demand for a product using simple linear regression"""
        # Get historical sales data for the last 90 days
        start_date = datetime.utcnow() - timedelta(days=90)
        
        sales_data = db.query(
            func.date(Transaction.created_at).label('date'),
            func.sum(Transaction.quantity).label('quantity')
        ).filter(
            Transaction.product_id == product_id,
            Transaction.transaction_type == 'OUT',
            Transaction.created_at >= start_date
        ).group_by(func.date(Transaction.created_at)).order_by('date').all()
        
        if len(sales_data) < 7:
            return {"prediction": "Insufficient data for prediction"}
        
        # Prepare data for regression
        dates = [(row.date - sales_data[0].date).days for row in sales_data]
        quantities = [row.quantity for row in sales_data]
        
        # Simple linear regression
        X = np.array(dates).reshape(-1, 1)
        y = np.array(quantities)
        
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict for the next days
        future_dates = [len(dates) + i for i in range(1, days_ahead + 1)]
        predictions = model.predict(np.array(future_dates).reshape(-1, 1))
        
        return {
            "product_id": product_id,
            "predictions": [
                {
                    "date": str(sales_data[0].date + timedelta(days=days_ahead + i)),
                    "predicted_quantity": max(0, int(pred))
                }
                for i, pred in enumerate(predictions)
            ]
        }
    
    async def calculate_inventory_turnover(self, db: Session):
        """Calculate inventory turnover ratio"""
        # This is a simplified calculation
        total_sales_value = db.query(
            func.sum(Transaction.total_value)
        ).filter(Transaction.transaction_type == 'OUT').scalar() or 0
        
        avg_inventory_value = db.query(
            func.avg(StockItem.quantity * Product.unit_price)
        ).join(Product).scalar() or 1
        
        turnover_ratio = total_sales_value / avg_inventory_value if avg_inventory_value > 0 else 0
        
        return {
            "turnover_ratio": turnover_ratio,
            "total_sales_value": total_sales_value,
            "average_inventory_value": avg_inventory_value
        }
    
    async def get_stockout_risk(self, db: Session):
        """Identify products at risk of stockout"""
        risk_products = db.query(
            Product.name,
            StockItem.quantity,
            Product.min_stock_level,
            (StockItem.quantity / Product.min_stock_level).label('risk_ratio')
        ).join(StockItem).filter(
            StockItem.quantity <= Product.min_stock_level * 2  # Within 2x of min level
        ).order_by('risk_ratio').limit(10).all()
        
        return [
            {
                "product_name": row.name,
                "current_stock": row.quantity,
                "min_stock": row.min_stock_level,
                "risk_level": "HIGH" if row.risk_ratio <= 0.5 else "MEDIUM"
            }
            for row in risk_products
        ]