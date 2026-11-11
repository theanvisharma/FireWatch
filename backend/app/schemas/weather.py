from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class HourlyForecast(BaseModel):
    time: str
    temperature: float
    humidity: float
    wind_speed: float
    precipitation_prob: float


class WeatherData(BaseModel):
    location_id: str
    location_name: str
    latitude: float
    longitude: float
    temperature: float
    feels_like: float
    humidity: float
    wind_speed: float
    wind_direction: str
    rainfall_past_24h: float
    soil_moisture: float
    solar_radiation: float
    vpd_kpa: float  # Vapor Pressure Deficit
    drought_index: float  # Keetch-Byram or equivalent
    condition: str
    icon: str
    forecast: List[HourlyForecast]
    recorded_at: datetime

