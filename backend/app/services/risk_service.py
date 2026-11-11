import logging
from typing import List, Optional
from datetime import datetime
from backend.app.schemas.risk import RiskAssessment, RiskMapResponse, RiskLevel, EnvironmentalFactors
from backend.app.schemas.prediction import PredictionRequest, PredictionResponse
from backend.app.services.mock_engine import get_mock_dashboard_summary, get_mock_risk_map, get_mock_location_risk, score_to_level

logger = logging.getLogger(__name__)


class RiskService:
    @staticmethod
    def get_dashboard_summary():
        return get_mock_dashboard_summary()

    @staticmethod
    def get_risk_map():
        return get_mock_risk_map()

    @staticmethod
    def get_location_risk(location_id: str) -> RiskAssessment:
        return get_mock_location_risk(location_id)

    @staticmethod
    def predict_risk(request: PredictionRequest) -> PredictionResponse:
        """
        Calculates predicted wildfire ignition risk based on input parameters.
        In future iterations, Vedant's XGBoost / Random Forest trained model will be invoked here.
        Currently applies physics-weighted heuristic rule set for the simulation.
        """
        # Physics-inspired risk formulation:
        # High temperature (>35C), high wind (>25km/h), low rain (<5mm), low soil moisture (<20%), low humidity (<30%)
        temp_score = min(max((request.temperature - 20) / 25 * 35, 0), 35)
        wind_score = min(max((request.wind_speed - 5) / 35 * 25, 0), 25)
        moisture_penalty = min(max((30 - request.soil_moisture) / 30 * 25, 0), 25)
        rain_relief = min(request.rainfall * 4, 20)
        humidity_factor = min(max((50 - (request.relative_humidity or 45)) / 50 * 15, 0), 15)
        slope_factor = min(((request.slope or 10) / 45) * 10, 10)

        raw_score = temp_score + wind_score + moisture_penalty + humidity_factor + slope_factor - rain_relief
        final_score = round(min(max(raw_score, 5.0), 98.5), 1)

        level = score_to_level(final_score)

        top_factors = []
        if request.temperature >= 35:
            top_factors.append(f"Elevated thermal stress ({request.temperature}°C)")
        if request.wind_speed >= 22:
            top_factors.append(f"High wind velocity ({request.wind_speed} km/h)")
        if request.soil_moisture <= 18:
            top_factors.append(f"Critical soil moisture deficit ({request.soil_moisture}%)")
        if (request.relative_humidity or 45) <= 30:
            top_factors.append("Low ambient relative humidity")
        if not top_factors:
            top_factors.append("Moderate ambient baseline")

        now = datetime.utcnow()
        return PredictionResponse(
            location_id=f"PRED-{int(request.latitude * 100)}-{int(request.longitude * 100)}",
            latitude=request.latitude,
            longitude=request.longitude,
            risk_score=final_score,
            risk_level=level,
            prediction_horizon=f"{request.horizon_hours or 48} hours",
            factors=EnvironmentalFactors(
                temperature=request.temperature,
                wind_speed=request.wind_speed,
                rainfall=request.rainfall,
                soil_moisture=request.soil_moisture,
                relative_humidity=request.relative_humidity,
                ndvi=request.ndvi,
                slope=request.slope
            ),
            model_version="v1.0-xgb-heuristics-bridge",
            generated_at=now,
            confidence=0.89,
            top_contributing_factors=top_factors,
            is_simulation=True
        )

