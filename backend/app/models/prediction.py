from sqlalchemy import Column, String, Float, DateTime, Integer, JSON, ForeignKey
from datetime import datetime
from backend.app.core.database import Base


class PredictionModel(Base):
    __tablename__ = "risk_predictions"

    id = Column(String(50), primary_key=True, index=True)
    location_id = Column(String(50), ForeignKey("monitored_locations.id"), nullable=False, index=True)
    risk_score = Column(Float, nullable=False)
    risk_level = Column(String(20), nullable=False, index=True)
    prediction_horizon = Column(String(50), default="24-72 hours")
    factors = Column(JSON, nullable=False)  # temperature, wind, rain, soil moisture, etc.
    model_version = Column(String(20), default="v1")
    confidence = Column(Float, default=0.90)
    generated_at = Column(DateTime, default=datetime.utcnow, index=True)

