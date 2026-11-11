from fastapi import APIRouter, Query
from typing import List, Optional
from backend.app.schemas.historical import HistoricalEvent
from backend.app.services.mock_engine import get_mock_historical_events

router = APIRouter()


@router.get("", response_model=List[HistoricalEvent])
def list_historical_data(
    severity: Optional[str] = Query(None, description="Filter by severity level"),
    region: Optional[str] = Query(None, description="Filter by geographic region"),
    min_area: Optional[float] = Query(None, description="Minimum burned area in hectares")
):
    """Retrieves historical wildfire incidents and correlates environmental conditions at ignition."""
    events = get_mock_historical_events()
    
    if severity:
        events = [e for e in events if e.severity.lower() == severity.lower()]
    if region:
        events = [e for e in events if region.lower() in e.region.lower()]
    if min_area is not None:
        events = [e for e in events if e.area_burned_hectares >= min_area]
        
    return events

