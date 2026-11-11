from fastapi import APIRouter
from typing import List
from backend.app.schemas.prediction import PredictionRequest, PredictionResponse
from backend.app.schemas.risk import RiskAssessment
from backend.app.services.risk_service import RiskService
from backend.app.services.mock_engine import get_mock_dashboard_summary

router = APIRouter()


@router.get("", response_model=List[RiskAssessment])
def list_predictions():
    """Lists recent automated risk predictions across monitored zones."""
    summary = RiskService.get_dashboard_summary()
    return summary.recent_predictions


@router.post("", response_model=PredictionResponse)
def compute_prediction(payload: PredictionRequest):
    """
    On-demand risk prediction for arbitrary geographic and meteorological inputs.
    Standardized payload format ready for Vedant's XGBoost ML model.
    """
    return RiskService.predict_risk(payload)

