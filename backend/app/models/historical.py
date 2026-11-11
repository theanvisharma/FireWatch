from sqlalchemy import Column, String, Float, DateTime, Integer, Date
from backend.app.core.database import Base


class HistoricalWildfireModel(Base):
    __tablename__ = "historical_wildfires"

    id = Column(String(50), primary_key=True, index=True)
    incident_date = Column(Date, nullable=False, index=True)
    location_id = Column(String(50), nullable=False)
    location_name = Column(String(100), nullable=False)
    region = Column(String(100), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    max_risk_score = Column(Float, nullable=False)
    severity = Column(String(20), nullable=False)
    area_burned_hectares = Column(Float, nullable=False)
    containment_days = Column(Integer, default=1)
    cause = Column(String(50), nullable=False)
    temperature_at_ignition = Column(Float, nullable=False)
    wind_speed_at_ignition = Column(Float, nullable=False)
    humidity_at_ignition = Column(Float, nullable=False)
    soil_moisture_at_ignition = Column(Float, nullable=False)
    satellite_detection_sensor = Column(String(50), default="VIIRS")

