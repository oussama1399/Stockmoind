# AI Stock Manager

An intelligent stock management system powered by AI/ML technologies.

## Features

- **Real-time Stock Tracking**: Monitor inventory levels across multiple warehouses
- **AI-Powered Analytics**: Demand forecasting and trend analysis
- **Computer Vision**: Automatic product counting from images
- **Intelligent Chatbot**: Natural language queries about stock
- **Automated Alerts**: Low stock and reorder notifications
- **Multi-warehouse Support**: Manage inventory across multiple locations

## Tech Stack

- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **AI/ML**: Scikit-learn, OpenCV, PyTorch
- **Frontend**: React.js (planned)
- **Authentication**: JWT tokens

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL
- Node.js (for frontend)

### Backend Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run the application:
```bash
python run.py
```

The API will be available at http://localhost:8000

### Database Setup

1. Create a PostgreSQL database named `stockmanager`
2. Update the `DATABASE_URL` in `.env`
3. The application will automatically create tables on startup

## API Endpoints

### Authentication
- `POST /auth/token` - Login
- `POST /auth/register` - Register new user

### Stock Management
- `GET /stock/products` - List all products
- `POST /stock/products` - Create new product
- `GET /stock` - Get stock levels
- `POST /stock/transactions` - Record stock transactions

### Analytics
- `GET /analytics/stock-summary` - Stock summary
- `GET /analytics/demand-prediction` - Demand forecasting

### AI Vision
- `POST /ai-vision/count-stock` - Count products in image
- `POST /ai-vision/train-model` - Train detection model

### Chatbot
- `POST /chatbot/query` - Natural language queries

## Development

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database configuration
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── routes/              # API routes
│   └── services/            # Business logic
├── requirements.txt         # Python dependencies
├── run.py                   # Application entry point
└── .env                     # Environment variables
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.