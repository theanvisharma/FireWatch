from typing import Dict, List
from pydantic import BaseModel
from datetime import datetime
from backend.app.schemas.risk import RiskAssessment, RiskLevel
from backend.app.schemas.alert import AlertItem


class RiskDistributionCount(BaseModel):
    category: RiskLevel
    count: int
    percentage: float
    color: str


class EnvironmentalSummary(BaseModel):
    avg_temperature: float
    avg_humidity: float
    avg_wind_speed: float
    avg_soil_moisture: float
    drought_stress_status: str
    drought_index_val: float


class DashboardSummary(BaseModel):
    system_status: str  # OPERATIONAL_SIMULATION
    last_updated: datetime
    total_monitored_regions: int
    high_risk_locations: int
    active_alerts: int
    avg_wildfire_risk: float
    risk_distribution: List[RiskDistributionCount]
    environmental_summary: EnvironmentalSummary
    recent_predictions: List[RiskAssessment]
    recent_alerts: List[AlertItem]
    data_disclaimer: str = "DEMO DATA: FireWatch AI prediction engine is running in prototype simulation mode."

