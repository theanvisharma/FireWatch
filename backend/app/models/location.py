from sqlalchemy import Column, String, Float, DateTime, Integer, Text
from datetime import datetime
from backend.app.core.database import Base


class LocationModel(Base):
    __tablename__ = "monitored_locations"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    region = Column(String(100), nullable=False, index=True)
    country = Column(String(50), default="India")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_meters = Column(Float, nullable=True)
    vegetation_type = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

