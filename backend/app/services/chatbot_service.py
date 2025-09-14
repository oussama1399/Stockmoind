import re
from typing import Dict, List
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models import Product, StockItem, Transaction

class ChatbotService:
    def __init__(self):
        self.query_patterns = {
            'stock_level': r'combien.*(?:reste|stock|quantité).*(\w+)',
            'low_stock': r'(?:produits?|articles?).*(?:faible|bas|manque)',
            'total_value': r'(?:valeur|prix).*total',
            'sales_trend': r'(?:ventes?|tendance).*(\d+).*jours?',
            'reorder': r'(?:réappro|commander|réapprovisionner)'
        }
    
    async def process_query(self, query: str, db: Session):
        """Process natural language queries about stock"""
        query_lower = query.lower()
        
        # Check for stock level queries
        stock_match = re.search(self.query_patterns['stock_level'], query_lower)
        if stock_match:
            product_name = stock_match.group(1)
            return await self._get_product_stock(product_name, db)
        
        # Check for low stock queries
        if re.search(self.query_patterns['low_stock'], query_lower):
            return await self._get_low_stock_products(db)
        
        # Check for total value queries
        if re.search(self.query_patterns['total_value'], query_lower):
            return await self._get_total_stock_value(db)
        
        # Check for sales trend queries
        sales_match = re.search(self.query_patterns['sales_trend'], query_lower)
        if sales_match:
            days = int(sales_match.group(1))
            return await self._get_sales_trend(days, db)
        
        # Check for reorder queries
        if re.search(self.query_patterns['reorder'], query_lower):
            return await self._get_reorder_suggestions(db)
        
        return {
            "response": "Je n'ai pas compris votre question. Essayez de demander 'Combien reste-t-il de [produit]?' ou 'Quels produits sont en rupture de stock?'",
            "type": "unknown_query"
        }
    
    async def _get_product_stock(self, product_name: str, db: Session):
        """Get stock level for a specific product"""
        product = db.query(Product).filter(
            Product.name.ilike(f'%{product_name}%')
        ).first()
        
        if not product:
            return {
                "response": f"Produit '{product_name}' non trouvé.",
                "type": "product_not_found"
            }
        
        stock_items = db.query(StockItem).filter(
            StockItem.product_id == product.id
        ).all()
        
        total_quantity = sum(item.quantity for item in stock_items)
        
        return {
            "response": f"Il reste {total_quantity} unités de {product.name} en stock.",
            "product": product.name,
            "total_quantity": total_quantity,
            "locations": [
                {
                    "warehouse_id": item.warehouse_id,
                    "quantity": item.quantity,
                    "location": item.location
                }
                for item in stock_items
            ],
            "type": "stock_level"
        }
    
    async def _get_low_stock_products(self, db: Session):
        """Get products with low stock levels"""
        low_stock_products = db.query(
            Product.name,
            StockItem.quantity,
            Product.min_stock_level
        ).join(StockItem).filter(
            StockItem.quantity <= Product.min_stock_level
        ).all()
        
        if not low_stock_products:
            return {
                "response": "Tous les produits sont en stock suffisant.",
                "type": "no_low_stock"
            }
        
        product_list = [
            f"{name}: {quantity}/{min_level} unités"
            for name, quantity, min_level in low_stock_products
        ]
        
        return {
            "response": f"Produits en rupture ou faible stock: {', '.join(product_list)}",
            "low_stock_products": [
                {
                    "name": name,
                    "current_stock": quantity,
                    "min_stock": min_level
                }
                for name, quantity, min_level in low_stock_products
            ],
            "type": "low_stock_list"
        }
    
    async def _get_total_stock_value(self, db: Session):
        """Get total value of all stock"""
        total_value = db.query(
            func.sum(StockItem.quantity * Product.unit_price)
        ).join(Product).scalar() or 0
        
        return {
            "response": f"La valeur totale du stock est de {total_value:.2f} €.",
            "total_value": total_value,
            "type": "total_value"
        }
    
    async def _get_sales_trend(self, days: int, db: Session):
        """Get sales trend for the specified period"""
        # This would integrate with analytics service
        return {
            "response": f"Analyse des ventes sur {days} jours en cours...",
            "type": "sales_trend",
            "days": days
        }
    
    async def _get_reorder_suggestions(self, db: Session):
        """Get reorder suggestions"""
        low_stock_products = db.query(Product).join(StockItem).filter(
            StockItem.quantity <= Product.min_stock_level
        ).all()
        
        suggestions = [
            f"Réapprovisionner {product.name} (stock actuel: {next((item.quantity for item in product.stock_items), 0)})"
            for product in low_stock_products
        ]
        
        return {
            "response": "Suggestions de réapprovisionnement: " + ", ".join(suggestions) if suggestions else "Aucun produit ne nécessite de réapprovisionnement immédiat.",
            "suggestions": suggestions,
            "type": "reorder_suggestions"
        }
    
    async def get_suggestions(self, db: Session):
        """Get AI-powered suggestions for stock management"""
        # Mock suggestions - in real implementation, use ML models
        suggestions = [
            "Considérez réapprovisionner les produits en faible stock",
            "Optimisez l'espace de stockage en regroupant les produits similaires",
            "Analysez les tendances saisonnières pour anticiper la demande"
        ]
        
        return {
            "suggestions": suggestions,
            "type": "management_suggestions"
        }
    
    async def generate_reorder_alerts(self, db: Session):
        """Generate reorder alerts for products below threshold"""
        low_stock_products = db.query(Product).join(StockItem).filter(
            StockItem.quantity <= Product.min_stock_level
        ).all()
        
        alerts = []
        for product in low_stock_products:
            current_stock = next((item.quantity for item in product.stock_items), 0)
            alerts.append({
                "product_id": product.id,
                "product_name": product.name,
                "current_stock": current_stock,
                "min_stock": product.min_stock_level,
                "suggested_order_quantity": product.max_stock_level - current_stock,
                "priority": "HIGH" if current_stock == 0 else "MEDIUM"
            })
        
        return {
            "alerts": alerts,
            "total_alerts": len(alerts),
            "type": "reorder_alerts"
        }