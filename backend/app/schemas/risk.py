from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum


class RiskLevel(str, Enum):
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"
    VERY_HIGH = "Very High"
    EXTREME = "Extreme"


class EnvironmentalFactors(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    wind_speed: float = Field(..., description="Wind speed in km/h")
    rainfall: float = Field(..., description="Recent precipitation in mm")
    soil_moisture: float = Field(..., description="Soil moisture percentage (0-100)")
    relative_humidity: Optional[float] = Field(None, description="Relative humidity percentage")
    ndvi: Optional[float] = Field(None, description="Normalized Difference Vegetation Index (-1 to 1)")
    slope: Optional[float] = Field(None, description="Terrain slope angle in degrees")


class RiskAssessment(BaseModel):
    location_id: str
    location_name: Optional[str] = None
    latitude: float
    longitude: float
    risk_score: float = Field(..., ge=0, le=100, description="Risk index between 0 and 100")
    risk_level: RiskLevel
    prediction_horizon: str = "24-72 hours"
    factors: EnvironmentalFactors
    model_version: str = "v1"
    generated_at: datetime
    confidence: Optional[float] = Field(0.92, description="Model confidence score")
    summary: Optional[str] = None


class RiskMapFeature(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float
    risk_score: float
    risk_level: RiskLevel
    polygon: Optional[List[List[float]]] = None
    factors: EnvironmentalFactors
    active_incidents: int = 0
    updated_at: datetime


class RiskMapResponse(BaseModel):
    total_zones: int
    high_risk_zones: int
    timestamp: datetime
    data_source_mode: str = "SIMULATED_DEMO_DATA"
    features: List[RiskMapFeature]

