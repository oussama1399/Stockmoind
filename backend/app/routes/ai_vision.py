from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from ..services.ai_vision_service import AIVisionService

router = APIRouter()
ai_vision_service = AIVisionService()

@router.post("/count-stock")
async def count_stock_from_image(
    file: UploadFile = File(...),
    product_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Count products in an uploaded image"""
    return await ai_vision_service.count_products_in_image(file, product_id, db)

@router.post("/detect-products")
async def detect_products(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Detect multiple products in an image"""
    return await ai_vision_service.detect_multiple_products(file, db)

@router.get("/stock-verification/{product_id}")
async def verify_stock_level(
    product_id: int,
    expected_quantity: int,
    db: Session = Depends(get_db)
):
    """Verify actual stock against expected quantity"""
    return await ai_vision_service.verify_stock_level(product_id, expected_quantity, db)

@router.post("/train-model")
async def train_product_detection_model(
    product_id: int,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    """Train the model with images of a specific product"""
    return await ai_vision_service.train_model(product_id, files, db)