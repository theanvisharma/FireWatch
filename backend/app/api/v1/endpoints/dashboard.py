from fastapi import APIRouter
from backend.app.schemas.dashboard import DashboardSummary
from backend.app.services.risk_service import RiskService

router = APIRouter()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary():
    """Returns high-level wildfire monitoring metrics, risk distribution, and active alerts."""
    return RiskService.get_dashboard_summary()

