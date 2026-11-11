# FireWatch AI — Backend & Database Module
**Module Owner: KHUSHI (Backend & Database Engineer)**

This directory contains the production-ready FastAPI service and database architecture for FireWatch AI.

---

## 🛠️ Tech Stack & Responsibilities
- **Framework:** FastAPI (Python 3.11+)
- **Validation:** Pydantic v2
- **ORM:** SQLAlchemy 2.0 with GeoAlchemy2
- **Database:** PostgreSQL with PostGIS extension
- **Responsibilities:**
  - RESTful APIs for frontend consumption
  - PostgreSQL schema & spatial table migrations
  - Live weather API integration (e.g. OpenWeather, ERA5)
  - Data ingestion validation
  - Coordination with Vedant (AI/ML) and Piyusha (GIS)

---

## 🚀 Quickstart

### 1. Create and Activate Virtual Environment
```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Development Server
```bash
uvicorn backend.app.main:app --reload --port 8000
```
Interactive API docs will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`

---

## 📡 Core API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | System health and simulation mode status |
| `GET` | `/api/v1/dashboard/summary` | Global counts, risk distribution, environmental summary |
| `GET` | `/api/v1/risk-map` | Geospatial zones and markers for Leaflet frontend |
| `GET` | `/api/v1/risk/{location_id}` | Detailed risk profile for a specific location |
| `GET` | `/api/v1/predictions` | Recent automated predictions list |
| `POST`| `/api/v1/predictions` | Real-time prediction calculation for arbitrary inputs |
| `GET` | `/api/v1/alerts` | Active high-risk alerts and mitigation instructions |
| `PATCH`| `/api/v1/alerts/{alert_id}`| Acknowledge or mark alert as read |
| `GET` | `/api/v1/weather/{location_id}` | Current atmospheric readings & 24h forecast |
| `GET` | `/api/v1/historical-data` | Historical wildfire incidents with environmental stats |

---

## 🗄️ Database Setup (PostgreSQL + PostGIS)
When running with Docker Compose:
```bash
docker compose up -d db
```
Khushi's next steps:
1. Implement Alembic migrations in `backend/alembic/`.
2. Connect live DB session in `backend/app/core/database.py`.
3. Toggle `MOCK_MODE_ENABLED=false` in `.env` once PostGIS tables are seeded.

