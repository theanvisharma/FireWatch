from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime
from backend.app.schemas.risk import RiskLevel


class HistoricalEvent(BaseModel):
    id: str
    incident_date: str
    location_id: str
    location_name: str
    region: str
    latitude: float
    longitude: float
    max_risk_score: float
    severity: RiskLevel
    area_burned_hectares: float
    containment_days: int
    cause: str  # Lightning, Human, Dry Fuel Spark, Under Investigation
    temperature_at_ignition: float
    wind_speed_at_ignition: float
    humidity_at_ignition: float
    soil_moisture_at_ignition: float
    satellite_detection_sensor: str  # MODIS, VIIRS


class HistoricalFilterParams(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    severity: Optional[str] = None
    region: Optional[str] = None
    min_area: Optional[float] = None

