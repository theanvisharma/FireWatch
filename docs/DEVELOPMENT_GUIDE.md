# FireWatch AI — Developer Collaboration Guide
**Team Architecture: 4 Independent Engineering Modules**

---

## 👥 Module Ownership & Responsibilities

| Engineer | Role | Module Directory | Core Deliverables |
|---|---|---|---|
| **ANVI** | Frontend Lead | `frontend/` | React (Vite) app, UI/UX, Dark Geospatial Theme, Dashboard, RiskMap (Leaflet), Alerts, Charts, API integration |
| **VEDANT** | AI/ML Lead | `ai-engine/` | Feature engineering, XGBoost / Random Forest models, Training pipeline, Calibration, ML inference bridge |
| **KHUSHI** | Backend & DB Lead | `backend/` | FastAPI REST services, PostgreSQL & PostGIS schemas, Weather APIs, Data validation, Mock/Live API toggle |
| **PIYUSHA** | GIS & DevOps Lead | `gis-pipeline/` | NASA FIRMS (MODIS/VIIRS) ingestion, Sentinel-2 NDVI, SRTM terrain slope, Docker deployment, CI/CD |

---

## 🌿 Git Branching Strategy

All team members must work on dedicated branches and create PRs into `develop`:

```text
main           <- Production releases only (tested & verified)
  └── develop  <- Integration branch where all modules converge
        ├── feature/frontend    (ANVI's workspace)
        ├── feature/ai-ml       (VEDANT's workspace)
        ├── feature/backend     (KHUSHI's workspace)
        └── feature/gis         (PIYUSHA's workspace)
```

### Branch Rules
1. Never commit secrets, `.env` files, or raw satellite geotiffs to Git.
2. Every PR requires approval and passing unit tests.
3. No direct pushes to `main` or `develop`.

---

## 🚀 Running the Project Locally

### 1. Run Everything with Docker Compose (Recommended)
```bash
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API Docs: `http://localhost:8000/docs`
- PostGIS Database: `localhost:5432`

---

### 2. Running Frontend Independently (ANVI)
```bash
cd frontend
npm install
npm run dev
```
By default, the frontend runs with `VITE_USE_MOCK_API=true`, allowing Anvi to build and preview UI without running the backend or database.

---

### 3. Running Backend Independently (KHUSHI)
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```
Backend defaults to `MOCK_MODE_ENABLED=true`, enabling full endpoint testing even without a running PostgreSQL database.

---

### 4. Running AI Engine (VEDANT)
```bash
cd ai-engine
pip install -r requirements.txt
python training/train_xgboost.py
python inference.py
```

---

### 5. Running GIS Pipeline (PIYUSHA)
```bash
cd gis-pipeline
pip install -r requirements.txt
python satellite/modis_viirs_fetcher.py
python geospatial/grid_generator.py
```

