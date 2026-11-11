"""
Vedant's XGBoost Model Training Script for FireWatch AI.
Trains an extreme gradient boosting classifier on environmental feature sets.
"""
import os
import json
import joblib
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, precision_recall_fscore_support, log_loss

# Check if xgboost is installed
try:
    from xgboost import XGBClassifier
except ImportError:
    XGBClassifier = None


def train_model(data_path: str = "ai-engine/datasets/sample_wildfire_features.csv", output_dir: str = "ai-engine/models"):
    print("[VEDANT - AI ENGINE] Initiating XGBoost Wildfire Risk Model Training...")
    
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Training dataset not found at {data_path}")
        
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} training observation records.")
    
    # Feature columns
    feature_cols = ['temperature', 'wind_speed', 'rainfall_72h', 'soil_moisture', 'relative_humidity', 'ndvi', 'slope', 'elevation']
    X = df[feature_cols]
    y = df['fire_ignited']
    
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.25, random_state=42)
    
    if XGBClassifier is None:
        print("[WARNING] XGBoost package not installed in environment. Run `pip install xgboost`.")
        return
        
    model = XGBClassifier(
        n_estimators=100,
        max_depth=4,
        learning_rate=0.08,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        eval_metric="logloss"
    )
    
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
    
    preds_proba = model.predict_proba(X_val)[:, 1]
    auc = roc_auc_score(y_val, preds_proba)
    print(f"[EVALUATION] Validation ROC-AUC: {auc:.4f}")
    
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, "xgboost_wildfire_v1.joblib")
    joblib.dump(model, model_path)
    
    metadata = {
        "model_version": "v1.0-xgb",
        "trained_at": datetime.utcnow().isoformat() + "Z",
        "author": "Vedant (AI/ML Lead)",
        "features": feature_cols,
        "metrics": {
            "validation_roc_auc": round(float(auc), 4)
        },
        "target": "wildfire_ignition_probability"
    }
    
    with open(os.path.join(output_dir, "model_metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Model and metadata successfully exported to {output_dir}")


if __name__ == "__main__":
    train_model()

