from fastapi import APIRouter, Depends, HTTPException, Path
from typing import List
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.core.database import get_db
from backend.app.models.alert import AlertModel
from backend.app.models.location import LocationModel
from backend.app.schemas.alert import AlertItem, AlertUpdate
from backend.app.schemas.risk import RiskLevel
from backend.app.services.mock_engine import get_mock_alerts

router = APIRouter()


@router.get("", response_model=List[AlertItem])
def list_alerts(db: Session = Depends(get_db)):
    """Returns active wildfire early warnings and preventative action directives."""
    if settings.MOCK_MODE_ENABLED or db is None:
        return get_mock_alerts()

    rows = db.query(AlertModel).order_by(AlertModel.created_at.desc()).all()
    locs = {l.id: l for l in db.query(LocationModel).all()}
    return [
        AlertItem(
            id=a.id,
            location_id=a.location_id,
            location_name=locs[a.location_id].name if a.location_id in locs else a.location_id,
            latitude=locs[a.location_id].latitude if a.location_id in locs else 18.75,
            longitude=locs[a.location_id].longitude if a.location_id in locs else 73.40,
            severity=RiskLevel(a.severity),
            risk_score=a.risk_score,
            timestamp=a.created_at,
            message=a.message,
            preventive_action=a.preventive_action,
            is_read=a.is_read,
            status=a.status,
            affected_radius_km=15.0,
        )
        for a in rows
    ]


@router.patch("/{alert_id}", response_model=AlertItem)
def update_alert(
    alert_id: str = Path(..., description="Alert ID to update"),
    payload: AlertUpdate = None,
    db: Session = Depends(get_db)
):
    """Updates read or acknowledged status of an alert."""
    if settings.MOCK_MODE_ENABLED or db is None:
        for item in get_mock_alerts():
            if item.id.lower() == alert_id.lower():
                if payload and payload.is_read is not None:
                    item.is_read = payload.is_read
                if payload and payload.status is not None:
                    item.status = payload.status
                return item
        raise HTTPException(status_code=404, detail="Alert not found")

    alert = db.query(AlertModel).filter(AlertModel.id.ilike(alert_id)).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    if payload and payload.is_read is not None:
        alert.is_read = payload.is_read
    if payload and payload.status is not None:
        alert.status = payload.status
    db.commit()
    db.refresh(alert)

    loc = db.query(LocationModel).filter(LocationModel.id == alert.location_id).first()
    return AlertItem(
        id=alert.id,
        location_id=alert.location_id,
        location_name=loc.name if loc else alert.location_id,
        latitude=loc.latitude if loc else 18.75,
        longitude=loc.longitude if loc else 73.40,
        severity=RiskLevel(alert.severity),
        risk_score=alert.risk_score,
        timestamp=alert.created_at,
        message=alert.message,
        preventive_action=alert.preventive_action,
        is_read=alert.is_read,
        status=alert.status,
        affected_radius_km=15.0,
    )