from fastapi import APIRouter, Path
from backend.app.schemas.weather import WeatherData
from backend.app.services.weather_service import WeatherService

router = APIRouter()


@router.get("/{location_id}", response_model=WeatherData)
def get_location_weather(
    location_id: str = Path(..., description="Location code or coordinate identifier")
):
    """Retrieves real-time weather metrics, atmospheric vapor deficit, and 24-hour forecast."""
    return WeatherService.get_current_weather(location_id)

