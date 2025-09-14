from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import stock, auth, analytics, ai_vision, chatbot
from .database import engine
from .models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Stock Manager",
    description="Intelligent stock management system with AI capabilities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(stock.router, prefix="/stock", tags=["Stock Management"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(ai_vision.router, prefix="/ai-vision", tags=["AI Vision"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "Welcome to AI Stock Manager API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}