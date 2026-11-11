from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from datetime import datetime
from backend.app.core.database import Base


class WeatherObservationModel(Base):
    __tablename__ = "weather_observations"

    id = Column(String(50), primary_key=True, index=True)
    location_id = Column(String(50), ForeignKey("monitored_locations.id"), nullable=False, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    wind_speed = Column(Float, nullable=False)
    wind_direction = Column(String(20), nullable=True)
    rainfall_past_24h = Column(Float, default=0.0)
    soil_moisture = Column(Float, nullable=False)
    solar_radiation = Column(Float, nullable=True)
    vpd_kpa = Column(Float, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)

