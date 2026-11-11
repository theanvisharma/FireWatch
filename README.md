# 🔥 FireWatch AI — Wildfire Risk Forecasting Platform
### AI-Powered Wildfire Risk Prediction & Geospatial Intelligence Dashboard

[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![PostGIS](https://img.shields.io/badge/Spatial%20DB-PostgreSQL%20%2B%20PostGIS-336791?style=flat&logo=postgresql)](https://postgis.net/)
[![XGBoost](https://img.shields.io/badge/AI%2FML-XGBoost%20%26%20Random%20Forest-EB5424?style=flat)](https://xgboost.ai/)
[![Docker](https://img.shields.io/badge/Container-Docker%20Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)

> **Shift Wildfire Management from Reactive Detection to Proactive 24–72 Hour Ignition Forecasting.**

---

## 📌 1. Project Overview

Wildfires inflict billions of dollars in ecological damage and release catastrophic volumes of greenhouse gases every year. The prevailing fire management paradigm remains largely **reactive**—detecting smoke plumes or open flames only after combustion has already taken hold.

**FireWatch AI** solves this critical gap by predicting wildfire ignition risk **before sparks ignite**. By fusing multi-spectral satellite remote sensing (NASA MODIS/VIIRS, Copernicus Sentinel-2), atmospheric weather telemetry (ERA5/OpenWeather), soil hydrology (NASA SMAP), and digital terrain physics (SRTM 30m DEM), the platform outputs localized risk scores, renders risk contours on an interactive dark geospatial map, and triggers early warning directives for forest services.

---

## 🎨 2. Visual Identity & Design System

FireWatch AI follows a minimal, understated dark geospatial command centre aesthetic:
- **Base Surfaces:** Main `#0D0F10`, Secondary `#141718`, Card `#191D1E`, Elevated `#202526`, Border `#2B3031`
- **Typography:** Inter typography hierarchy, compact monospace coordinates and telemetry badges
- **Brand Orange Accent (Used Sparingly):** `#D97735` (Active states, key buttons, and small highlights)
- **Calibrated Wildfire Severity Color System:**
  - 🟢 **Low (<35%):** `#43A879`
  - 🟡 **Moderate (35–54%):** `#D5B34A`
  - 🟠 **High (55–74%):** `#DB873A`
  - 🔴 **Very High (75–87%):** `#D95343`
  - 🟣 **Extreme (≥88%):** `#8F2528`

---

## 👥 3. Shared Development Architecture (4 Independent Modules)

The monorepo is engineered so that four developers can develop, test, and containerize their modules without stepping on each other:

| Developer | Role & Domain | Module Directory | Core Responsibilities |
|---|---|---|---|
| **ANVI** | **Frontend Lead** | `frontend/` | React (Vite) application, UI/UX, Dark geospatial dashboard, Leaflet interactive risk map, charts, alerts, API client |
| **VEDANT** | **AI/ML Lead** | `ai-engine/` | Feature engineering (VPD, fuel dryness, slope interaction), Random Forest & XGBoost risk models, SHAP explainability, ML contract |
| **KHUSHI** | **Backend & DB Lead** | `backend/` | FastAPI REST endpoints, Pydantic schemas, PostgreSQL & PostGIS spatial database, live weather API integration, mock/live toggle |
| **PIYUSHA** | **GIS & Deployment Lead** | `gis-pipeline/` | NASA FIRMS (MODIS/VIIRS) ingestion, Sentinel-2 NDVI processing, SRTM slope analysis, Docker & CI/CD deployment |

---

## 📂 4. Monorepo Root Structure

```text
FireWatch-AI/
├── frontend/                     <- ANVI: React + Vite + Tailwind + Leaflet
│   ├── src/
│   │   ├── components/           <- common, layout, dashboard, maps, charts, alerts
│   │   ├── pages/                <- Dashboard, RiskMap, HistoricalData, Alerts, About, NotFound
│   │   ├── layouts/              <- MainLayout
│   │   ├── services/             <- api.js, mockData.js, riskService.js, weatherService.js
│   │   ├── styles/               <- globals.css, variables.css
│   │   └── App.jsx
│   └── package.json
│
├── backend/                      <- KHUSHI: FastAPI + PostgreSQL/PostGIS
│   ├── app/
│   │   ├── api/v1/endpoints/     <- dashboard, risk, predictions, alerts, weather, historical
│   │   ├── core/                 <- config.py, database.py
│   │   ├── models/               <- SQLAlchemy & GeoAlchemy2 models
│   │   ├── schemas/              <- Pydantic schemas matching API contracts
│   │   ├── services/             <- risk_service, weather_service, mock_engine
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── ai-engine/                    <- VEDANT: Machine Learning Pipelines
│   ├── datasets/                 <- sample_wildfire_features.csv
│   ├── preprocessing/            <- feature_engineering.py, pipeline.py
│   ├── training/                 <- train_xgboost.py, train_random_forest.py
│   ├── models/                   <- model_metadata.json
│   ├── evaluation/               <- metrics.py (ROC-AUC, Brier score)
│   ├── inference.py              <- Standardized prediction bridge
│   └── requirements.txt
│
├── gis-pipeline/                 <- PIYUSHA: Satellite & Spatial Pipelines
│   ├── satellite/                <- modis_viirs_fetcher.py (NASA FIRMS)
│   ├── vegetation/               <- ndvi_processing.py (Sentinel-2 NDVI)
│   ├── terrain/                  <- slope_elevation.py (SRTM DEM)
│   ├── geospatial/               <- grid_generator.py, postgis_loader.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── docs/                         <- System Contracts & Specifications
│   ├── API_CONTRACT.md           <- REST specification & schemas
│   ├── DATABASE_SCHEMA.md        <- PostgreSQL + PostGIS SQL schema
│   ├── ML_CONTRACT.md            <- ML input/output standards
│   └── DEVELOPMENT_GUIDE.md      <- Multi-developer workflow & guidelines
│
├── docker-compose.yml            <- Full-stack orchestration (Frontend, Backend, PostGIS)
└── README.md
```

---

## ⚡ 5. Quickstart & Installation

### Option A: Run Full Stack via Docker Compose (Recommended)
```bash
docker compose up --build
```
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **FastAPI Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostGIS Port:** `localhost:5432`

To run the GIS hotspot export separately (simulated sample data by default):
```bash
docker compose --profile gis run --rm gis-pipeline
```
See [`gis-pipeline/README.md`](./gis-pipeline/README.md) for running it with
NASA FIRMS credentials and exporting the GeoJSON output.

---

### Option B: Run Modules Independently

#### 1. Frontend (Anvi)
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`. Defaults to `VITE_USE_MOCK_API=true` for seamless standalone UI development.

#### 2. Backend (Khushi)
```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\activate | On Unix: source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```
Runs at `http://localhost:8000`. Runs in standalone mock/development mode even without active PostgreSQL.

#### 3. AI / Machine Learning (Vedant)
```bash
cd ai-engine
pip install -r requirements.txt
python training/train_xgboost.py
python inference.py
```

#### 4. GIS Pipeline (Piyusha)
```bash
cd gis-pipeline
pip install -r requirements.txt
python satellite/modis_viirs_fetcher.py
python geospatial/grid_generator.py
```

---

## 🌿 6. Git Branching & Collaboration Guidelines

```text
main           <- Production releases only
  └── develop  <- Core integration branch
        ├── feature/frontend    (ANVI)
        ├── feature/backend     (KHUSHI)
        ├── feature/ai-ml       (VEDANT)
        └── feature/gis         (PIYUSHA)
```

1. **Keep Mock Data Isolated:** All mock responses live in `frontend/src/services/mockData.js` and `backend/app/services/mock_engine.py`. Never hardcode responses inside UI components.
2. **Environment Configuration:** Copy `.env.example` to `.env` in `frontend/` and `backend/`. Never commit `.env` or credentials.
3. **Adhere to Contracts:** All developers must adhere to `docs/API_CONTRACT.md` and `docs/ML_CONTRACT.md`.

---

## 📄 License
MIT License. Built for proactive environmental stewardship and wildfire risk reduction.
