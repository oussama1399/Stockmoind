from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product, StockItem, Warehouse, Transaction, Alert
from ..schemas.stock import (
    ProductCreate, ProductResponse, ProductUpdate,
    StockItemResponse, StockItemUpdate,
    TransactionCreate, TransactionResponse,
    WarehouseCreate, WarehouseResponse
)
from ..services.stock_service import StockService

router = APIRouter()
stock_service = StockService()

@router.get("/products", response_model=List[ProductResponse])
async def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@router.post("/products", response_model=ProductResponse)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.sku == product.sku).first()
    if db_product:
        raise HTTPException(status_code=400, detail="SKU already exists")
    
    if product.barcode:
        db_product = db.query(Product).filter(Product.barcode == product.barcode).first()
        if db_product:
            raise HTTPException(status_code=400, detail="Barcode already exists")
    
    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product_update: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product_update.dict(exclude_unset=True).items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

@router.get("/stock", response_model=List[StockItemResponse])
async def get_stock_levels(warehouse_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(StockItem)
    if warehouse_id:
        query = query.filter(StockItem.warehouse_id == warehouse_id)
    return query.all()

@router.put("/stock/{stock_item_id}", response_model=StockItemResponse)
async def update_stock_level(stock_item_id: int, stock_update: StockItemUpdate, db: Session = Depends(get_db)):
    stock_item = db.query(StockItem).filter(StockItem.id == stock_item_id).first()
    if not stock_item:
        raise HTTPException(status_code=404, detail="Stock item not found")
    
    for key, value in stock_update.dict(exclude_unset=True).items():
        setattr(stock_item, key, value)
    
    db.commit()
    db.refresh(stock_item)
    
    # Check for alerts
    await stock_service.check_stock_alerts(stock_item, db)
    
    return stock_item

@router.post("/transactions", response_model=TransactionResponse)
async def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    # Validate stock levels for outgoing transactions
    if transaction.transaction_type == "OUT":
        stock_item = db.query(StockItem).filter(
            StockItem.product_id == transaction.product_id,
            StockItem.warehouse_id == transaction.warehouse_id
        ).first()
        if not stock_item or stock_item.quantity < transaction.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
    
    new_transaction = Transaction(**transaction.dict())
    db.add(new_transaction)
    
    # Update stock levels
    stock_item = db.query(StockItem).filter(
        StockItem.product_id == transaction.product_id,
        StockItem.warehouse_id == transaction.warehouse_id
    ).first()
    
    if not stock_item:
        # Create new stock item if it doesn't exist
        stock_item = StockItem(
            product_id=transaction.product_id,
            warehouse_id=transaction.warehouse_id,
            quantity=0
        )
        db.add(stock_item)
    
    if transaction.transaction_type == "IN":
        current_quantity = getattr(stock_item, 'quantity', 0)
        setattr(stock_item, 'quantity', current_quantity + transaction.quantity)
    else:
        current_quantity = getattr(stock_item, 'quantity', 0)
        if current_quantity < transaction.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        setattr(stock_item, 'quantity', current_quantity - transaction.quantity)
    
    db.commit()
    db.refresh(new_transaction)
    
    # Check for alerts after stock update
    await stock_service.check_stock_alerts(stock_item, db)
    
    return new_transaction

@router.get("/warehouses", response_model=List[WarehouseResponse])
async def get_warehouses(db: Session = Depends(get_db)):
    return db.query(Warehouse).all()

@router.post("/warehouses", response_model=WarehouseResponse)
async def create_warehouse(warehouse: WarehouseCreate, db: Session = Depends(get_db)):
    new_warehouse = Warehouse(**warehouse.dict())
    db.add(new_warehouse)
    db.commit()
    db.refresh(new_warehouse)
    return new_warehouse

@router.get("/alerts")
async def get_alerts(resolved: bool = False, db: Session = Depends(get_db)):
    query = db.query(Alert)
    if not resolved:
        query = query.filter(Alert.is_resolved == False)
    return query.all()