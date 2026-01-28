# DevStock Frontend-Backend Integration Guide

## Setup Complete ✅

The new frontend from the `frontend/` folder has been successfully connected with the backend from the `backend/` folder.

### What Was Done:

1. **Removed Old Frontend** - Deleted all files from `DevStock/src/` directory
2. **Updated Backend API** - Created comprehensive API endpoints in `backend/core/views.py`:
   - `/api/stocks/` - Get all stocks
   - `/api/stocks/{symbol}/` - Get specific stock details
   - `/api/stocks/{symbol}/history/` - Get historical data
   - `/api/predictions/` - Get stock predictions
   - `/api/predictions/{symbol}/` - Get prediction for specific stock
   - `/api/news/` - Get news articles
   - `/api/news/{id}/` - Get specific article
   - `/api/market/indices/` - Get market indices
   - `/api/market/status/` - Get market status
   - `/api/market/movers/` - Get top gainers/losers

3. **Configured CORS** - Updated `backend/settings.py`:
   - Allowed frontend development server at `http://127.0.0.1:5173` (Vite default)
   - Also added ports 3000 and 8080 as fallbacks
   - Set `ALLOWED_HOSTS = ['*']` for development

4. **Set Frontend Environment** - Created `frontend/.env.local`:
   - `VITE_API_URL=http://127.0.0.1:8000/api`

### How to Run:

#### Terminal 1 - Backend:
```bash
cd backend
python manage.py runserver 8000
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm install  # if not already installed
npm run dev
```

The frontend will be available at `http://127.0.0.1:5173`
The backend will be available at `http://127.0.0.1:8000`

### API Base URL:
- **Development**: `http://127.0.0.1:8000/api`
- Configured in: `frontend/src/services/api.js`

### Key Features Integrated:
- Stock data fetching and display
- Price predictions
- News aggregation
- Market indices tracking
- Top market movers
- Search functionality

### Frontend File Structure:
```
frontend/
├── src/
│   ├── components/
│   │   ├── charts/ - Stock chart components
│   │   ├── layout/ - Main layout with header and sidebar
│   │   ├── news/ - News card components
│   │   └── stocks/ - Stock market components
│   ├── pages/ - Dashboard, News, Stock Detail, Welcome
│   ├── services/ - API service with all endpoints
│   └── styles/ - Global and component styles
└── package.json - Dependencies (React, React Router, Recharts, Lucide Icons)
```

### Backend File Structure:
```
backend/
├── core/
│   ├── views.py - All API endpoints
│   ├── models.py - Database models
│   ├── serializers.py - Data serializers
│   └── main_model.py - ML prediction model
└── backend/
    ├── settings.py - Django configuration with CORS
    └── urls.py - URL routing
```

### Development Notes:
- Mock data is provided in views for development/testing
- Replace with actual data from `main_model.py` as needed
- CSV files (TSLA.csv, Amazon.csv, GOOGL.csv) are available in `core/` directory
- Database uses SQLite (`db.sqlite3`)

---
**Status**: Ready for Development 🚀
