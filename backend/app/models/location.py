from sqlalchemy import Column, String, Float, DateTime
from geoalchemy2 import Geometry
from datetime import datetime
from backend.app.core.database import Base


class LocationModel(Base):
    __tablename__ = "monitored_locations"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    region = Column(String(120), nullable=False, index=True)
    country = Column(String(60), default="India")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geom = Column(Geometry("POINT", srid=4326), nullable=True)
    boundary_geom = Column(Geometry("POLYGON", srid=4326), nullable=True)
    elevation_meters = Column(Float, nullable=True)
    vegetation_type = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)