from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.schemas.dashboard import DashboardSummary
from backend.app.services.risk_service import RiskService

router = APIRouter()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)):
    """Returns high-level wildfire monitoring metrics, risk distribution, and active alerts."""
    return RiskService.get_dashboard_summary(db)