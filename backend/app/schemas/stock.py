from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    sku: str
    barcode: Optional[str] = None
    category: str
    unit_price: float
    min_stock_level: int = 0
    max_stock_level: int = 1000

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    sku: Optional[str] = None
    barcode: Optional[str] = None
    category: Optional[str] = None
    unit_price: Optional[float] = None
    min_stock_level: Optional[int] = None
    max_stock_level: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class WarehouseBase(BaseModel):
    name: str
    location: str
    capacity: int

class WarehouseCreate(WarehouseBase):
    pass

class WarehouseResponse(WarehouseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class StockItemBase(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int
    location: str

class StockItemUpdate(BaseModel):
    quantity: Optional[int] = None
    location: Optional[str] = None

class StockItemResponse(StockItemBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    product_id: int
    warehouse_id: int
    supplier_id: Optional[int] = None
    transaction_type: str  # 'IN' or 'OUT'
    quantity: int
    unit_price: Optional[float] = None
    reference: str
    notes: Optional[str] = None
    created_by: int

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: int
    total_value: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True