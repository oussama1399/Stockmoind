from sqlalchemy.orm import Session
from ..models import Alert, Product, StockItem

class StockService:
    async def check_stock_alerts(self, stock_item: StockItem, db: Session):
        """Check for low stock or overstock alerts"""
        product = stock_item.product
        
        # Check low stock
        if stock_item.quantity <= product.min_stock_level:
            severity = "HIGH"
            alert = Alert(
                product_id=stock_item.product_id,
                warehouse_id=stock_item.warehouse_id,
                alert_type="LOW_STOCK",
                message=f"Low stock alert: {product.name} has {stock_item.quantity} units remaining",
                severity=severity
            )
            db.add(alert)
        
        # Check overstock
        elif stock_item.quantity >= product.max_stock_level:
            alert = Alert(
                product_id=stock_item.product_id,
                warehouse_id=stock_item.warehouse_id,
                alert_type="OVERSTOCK",
                message=f"Overstock alert: {product.name} has {stock_item.quantity} units (max: {product.max_stock_level})",
                severity="MEDIUM"
            )
            db.add(alert)
        
        db.commit()
    
    def get_total_stock_value(self, db: Session) -> float:
        """Calculate total value of all stock"""
        result = db.query(
            (StockItem.quantity * Product.unit_price).label('value')
        ).join(Product).all()
        
        return sum(row.value for row in result)
    
    def get_low_stock_products(self, db: Session):
        """Get products with low stock levels"""
        return db.query(StockItem).join(Product).filter(
            StockItem.quantity <= Product.min_stock_level
        ).all()
    
    def get_overstock_products(self, db: Session):
        """Get products with overstock levels"""
        return db.query(StockItem).join(Product).filter(
            StockItem.quantity >= Product.max_stock_level
        ).all()