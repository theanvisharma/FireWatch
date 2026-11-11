from sqlalchemy import Column, String, Float, DateTime, Boolean, ForeignKey, Text
from datetime import datetime
from backend.app.core.database import Base


class AlertModel(Base):
    __tablename__ = "wildfire_alerts"

    id = Column(String(50), primary_key=True, index=True)
    location_id = Column(String(50), ForeignKey("monitored_locations.id"), nullable=False, index=True)
    severity = Column(String(20), nullable=False, index=True)
    risk_score = Column(Float, nullable=False)
    message = Column(Text, nullable=False)
    preventive_action = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

