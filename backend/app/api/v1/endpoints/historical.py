from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.core.database import get_db
from backend.app.models.historical import HistoricalWildfireModel
from backend.app.schemas.historical import HistoricalEvent
from backend.app.schemas.risk import RiskLevel
from backend.app.services.mock_engine import get_mock_historical_events

router = APIRouter()


@router.get("", response_model=List[HistoricalEvent])
def list_historical_data(
    severity: Optional[str] = Query(None, description="Filter by severity level"),
    region: Optional[str] = Query(None, description="Filter by geographic region"),
    min_area: Optional[float] = Query(None, description="Minimum burned area in hectares"),
    db: Session = Depends(get_db)
):
    """Retrieves historical wildfire incidents and correlates environmental conditions at ignition."""
    if settings.MOCK_MODE_ENABLED or db is None:
        events = get_mock_historical_events()
        if severity:
            events = [e for e in events if e.severity.lower() == severity.lower()]
        if region:
            events = [e for e in events if region.lower() in e.region.lower()]
        if min_area is not None:
            events = [e for e in events if e.area_burned_hectares >= min_area]
        return events

    query = db.query(HistoricalWildfireModel)
    if severity:
        query = query.filter(HistoricalWildfireModel.severity.ilike(severity))
    if region:
        query = query.filter(HistoricalWildfireModel.region.ilike(f"%{region}%"))
    if min_area is not None:
        query = query.filter(HistoricalWildfireModel.area_burned_hectares >= min_area)

    rows = query.order_by(HistoricalWildfireModel.incident_date.desc()).all()
    return [
        HistoricalEvent(
            id=r.id,
            incident_date=r.incident_date.isoformat(),
            location_id=r.location_id,
            location_name=r.location_name,
            region=r.region,
            latitude=r.latitude,
            longitude=r.longitude,
            max_risk_score=r.max_risk_score,
            severity=RiskLevel(r.severity),
            area_burned_hectares=r.area_burned_hectares,
            containment_days=r.containment_days,
            cause=r.cause,
            temperature_at_ignition=r.temperature_at_ignition,
            wind_speed_at_ignition=r.wind_speed_at_ignition,
            humidity_at_ignition=r.humidity_at_ignition,
            soil_moisture_at_ignition=r.soil_moisture_at_ignition,
            satellite_detection_sensor=r.satellite_detection_sensor,
        )
        for r in rows
    ]