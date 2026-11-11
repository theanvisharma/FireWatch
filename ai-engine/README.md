# FireWatch AI — AI/ML Prediction Engine
**Module Owner: VEDANT (AI/ML Engineer)**

This directory contains the machine learning pipelines, feature engineering, model training scripts, and inference bridges for proactive wildfire ignition risk forecasting.

---

## 🎯 Vedant's Core Objectives
1. **Dataset Curation & Synthesis:** Curate multimodal tabular records combining NASA FIRMS thermal detections, ERA5 reanalysis weather, and Sentinel-2 NDVI.
2. **Feature Engineering:** Build domain-specific environmental indices:
   - Vapor Pressure Deficit (VPD)
   - Keetch-Byram Drought Index (KBDI) proxy
   - Fuel Dryness Index (FMC proxy)
   - Wind-Slope Chimney Alignment Factor
3. **Model Development:**
   - Baseline: Scikit-learn Random Forest (`train_random_forest.py`)
   - Production Candidate: XGBoost Classifier (`train_xgboost.py`)
4. **Calibration & SHAP Explainability:**
   - Optimize Brier score and ROC-AUC
   - Generate local factor attributions for frontend display

---

## 📂 Module Structure
```
ai-engine/
├── datasets/             <- Cleaned training, validation, and test datasets
│   └── sample_wildfire_features.csv
├── preprocessing/        <- Feature engineering and scikit-learn pipelines
│   ├── feature_engineering.py
│   └── pipeline.py
├── training/             <- Training routines for XGBoost & Random Forest
│   ├── train_xgboost.py
│   └── train_random_forest.py
├── models/               <- Serialized joblib models and metadata
│   └── model_metadata.json
├── evaluation/           <- Metrics, confusion matrices, ROC-AUC, Brier score
│   └── metrics.py
├── inference.py          <- Standalone inference engine adhering to ML_CONTRACT.md
├── requirements.txt      <- Dependencies for ML training
└── README.md
```

---

## ⚡ Standard Output Contract
Every inference call must return the standardized payload defined in `docs/ML_CONTRACT.md`:
```json
{
  "location_id": "LOC001",
  "latitude": 18.52,
  "longitude": 73.85,
  "risk_score": 78.5,
  "risk_level": "High",
  "prediction_horizon": "24-72 hours",
  "factors": {
    "temperature": 38,
    "wind_speed": 25,
    "rainfall": 2,
    "soil_moisture": 18
  },
  "model_version": "v1",
  "generated_at": "2026-11-11T10:00:00Z"
}
```

