import logging
from backend.app.schemas.weather import WeatherData
from backend.app.services.mock_engine import get_mock_weather

logger = logging.getLogger(__name__)


class WeatherService:
    @staticmethod
    def get_current_weather(location_id: str) -> WeatherData:
        """
        Retrieves weather observation.
        Khushi will wire this to live OpenWeather/ERA5 API endpoints.
        """
        return get_mock_weather(location_id)

