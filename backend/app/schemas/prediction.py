from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from backend.app.schemas.risk import RiskLevel, EnvironmentalFactors


class PredictionRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    temperature: float = Field(..., description="Air temperature in Celsius")
    wind_speed: float = Field(..., description="Wind velocity in km/h")
    rainfall: float = Field(0.0, ge=0, description="Precipitation in last 72 hours (mm)")
    soil_moisture: float = Field(..., ge=0, le=100, description="Volumetric soil moisture %")
    relative_humidity: Optional[float] = Field(45.0, ge=0, le=100)
    ndvi: Optional[float] = Field(0.35, ge=-1.0, le=1.0)
    slope: Optional[float] = Field(12.0, ge=0, le=90)
    horizon_hours: Optional[int] = Field(48, ge=6, le=168)


class PredictionResponse(BaseModel):
    location_id: str
    latitude: float
    longitude: float
    risk_score: float
    risk_level: RiskLevel
    prediction_horizon: str
    factors: EnvironmentalFactors
    model_version: str
    generated_at: datetime
    confidence: float
    top_contributing_factors: List[str]
    is_simulation: bool = True

