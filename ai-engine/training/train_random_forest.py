"""
Vedant's Random Forest Baseline Model Training Script for FireWatch AI.
"""
import os
import json
import joblib
import pandas as pd
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score


def train_baseline_rf(data_path: str = "ai-engine/datasets/sample_wildfire_features.csv", output_dir: str = "ai-engine/models"):
    print("[VEDANT - AI ENGINE] Initiating Random Forest Baseline Training...")
    
    df = pd.read_csv(data_path)
    feature_cols = ['temperature', 'wind_speed', 'rainfall_72h', 'soil_moisture', 'relative_humidity', 'ndvi', 'slope', 'elevation']
    X = df[feature_cols]
    y = df['fire_ignited']
    
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.25, random_state=42)
    
    rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    rf.fit(X_train, y_train)
    
    preds_proba = rf.predict_proba(X_val)[:, 1]
    auc = roc_auc_score(y_val, preds_proba)
    print(f"[EVALUATION] Random Forest Validation ROC-AUC: {auc:.4f}")
    
    os.makedirs(output_dir, exist_ok=True)
    joblib.dump(rf, os.path.join(output_dir, "random_forest_wildfire_v1.joblib"))
    print("Baseline model exported successfully.")


if __name__ == "__main__":
    train_baseline_rf()

