from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.schemas.weather import WeatherData
from backend.app.services.weather_service import WeatherService

router = APIRouter()


@router.get("/{location_id}", response_model=WeatherData)
def get_location_weather(
    location_id: str = Path(..., description="Location code or coordinate identifier"),
    db: Session = Depends(get_db)
):
    """Retrieves real-time weather metrics, atmospheric vapor deficit, and 24-hour forecast."""
    return WeatherService.get_current_weather(location_id, db)