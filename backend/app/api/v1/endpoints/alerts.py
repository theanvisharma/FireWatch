from fastapi import APIRouter, HTTPException, Path
from typing import List
from backend.app.schemas.alert import AlertItem, AlertUpdate
from backend.app.services.mock_engine import get_mock_alerts

router = APIRouter()

# In-memory alert store for live demonstration
_in_memory_alerts: List[AlertItem] = []


def _get_alerts():
    global _in_memory_alerts
    if not _in_memory_alerts:
        _in_memory_alerts = get_mock_alerts()
    return _in_memory_alerts


@router.get("", response_model=List[AlertItem])
def list_alerts():
    """Returns active wildfire early warnings and preventative action directives."""
    return _get_alerts()


@router.patch("/{alert_id}", response_model=AlertItem)
def update_alert(
    alert_id: str = Path(..., description="Alert ID to update"),
    payload: AlertUpdate = None
):
    """Updates read or acknowledged status of an alert."""
    alerts = _get_alerts()
    for item in alerts:
        if item.id.lower() == alert_id.lower():
            if payload and payload.is_read is not None:
                item.is_read = payload.is_read
            if payload and payload.status is not None:
                item.status = payload.status
            return item
    raise HTTPException(status_code=404, detail="Alert not found")

