from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from backend.app.schemas.risk import RiskLevel


class AlertItem(BaseModel):
    id: str
    location_id: str
    location_name: str
    latitude: float
    longitude: float
    severity: RiskLevel
    risk_score: float
    timestamp: datetime
    message: str
    preventive_action: str
    is_read: bool = False
    status: str = "active"  # active, mitigated, acknowledged
    affected_radius_km: float = 15.0


class AlertUpdate(BaseModel):
    is_read: Optional[bool] = None
    status: Optional[str] = None

