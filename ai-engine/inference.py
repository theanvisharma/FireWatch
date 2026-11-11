"""
Inference engine bridge for FireWatch AI.
Provides single-location and batch risk scoring.
Adheres strictly to the standardized FireWatch ML Contract.
"""
import os
import joblib
from datetime import datetime
from typing import Dict, Any


def score_to_category(score: float) -> str:
    if score < 35:
        return "Low"
    elif score < 55:
        return "Moderate"
    elif score < 75:
        return "High"
    elif score < 88:
        return "Very High"
    else:
        return "Extreme"


class WildfireRiskInference:
    def __init__(self, model_path: str = "ai-engine/models/xgboost_wildfire_v1.joblib"):
        self.model_path = model_path
        self.model = None
        self.version = "v1.0-sim"
        if os.path.exists(model_path):
            try:
                self.model = joblib.load(model_path)
                self.version = "v1.0-xgb"
            except Exception as e:
                print(f"[AI ENGINE] Could not load model from {model_path}: {e}")

    def predict(self, location_id: str, latitude: float, longitude: float, factors: Dict[str, float]) -> Dict[str, Any]:
        """
        Executes inference for a single coordinate and meteorological profile.
        Returns standardized response.
        """
        # If trained model is present, execute model prediction
        if self.model is not None:
            features = [[
                factors.get("temperature", 30),
                factors.get("wind_speed", 15),
                factors.get("rainfall", 0),
                factors.get("soil_moisture", 20),
                factors.get("relative_humidity", 40),
                factors.get("ndvi", 0.4),
                factors.get("slope", 10),
                factors.get("elevation", 500)
            ]]
            proba = float(self.model.predict_proba(features)[0][1])
            risk_score = round(proba * 100, 1)
        else:
            # Physics-heuristic fallback bridge
            temp = factors.get("temperature", 30)
            wind = factors.get("wind_speed", 15)
            rain = factors.get("rainfall", 0)
            moist = factors.get("soil_moisture", 20)
            
            raw = (max(temp - 20, 0) * 1.5) + (wind * 0.8) + (max(35 - moist, 0) * 1.2) - (rain * 3)
            risk_score = round(min(max(raw, 5.0), 96.0), 1)

        level = score_to_category(risk_score)

        return {
            "location_id": location_id,
            "latitude": latitude,
            "longitude": longitude,
            "risk_score": risk_score,
            "risk_level": level,
            "prediction_horizon": "24-72 hours",
            "factors": {
                "temperature": factors.get("temperature", 30),
                "wind_speed": factors.get("wind_speed", 15),
                "rainfall": factors.get("rainfall", 0),
                "soil_moisture": factors.get("soil_moisture", 20)
            },
            "model_version": self.version,
            "generated_at": datetime.utcnow().isoformat() + "Z"
        }

