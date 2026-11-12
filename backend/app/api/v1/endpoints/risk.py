from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.schemas.risk import RiskMapResponse, RiskAssessment
from backend.app.services.risk_service import RiskService

router = APIRouter()


@router.get("/risk-map", response_model=RiskMapResponse)
def get_risk_map(db: Session = Depends(get_db)):
    """Returns geospatial features with risk zones, polygons, and attributes for Leaflet visualization."""
    return RiskService.get_risk_map(db)


@router.get("/risk/{location_id}", response_model=RiskAssessment)
def get_location_risk(
    location_id: str = Path(..., description="Unique alphanumeric identifier for monitored sector"),
    db: Session = Depends(get_db)
):
    """Returns detailed wildfire risk prediction and environmental breakdown for a specific location."""
    result = RiskService.get_location_risk(location_id, db)
    if not result:
        raise HTTPException(status_code=404, detail=f"Location {location_id} not found in monitored registry")
    return result