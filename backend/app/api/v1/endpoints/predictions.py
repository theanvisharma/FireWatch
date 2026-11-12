from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.schemas.prediction import PredictionRequest, PredictionResponse
from backend.app.schemas.risk import RiskAssessment
from backend.app.services.risk_service import RiskService

router = APIRouter()


@router.get("", response_model=List[RiskAssessment])
def list_predictions(db: Session = Depends(get_db)):
    """Lists recent automated risk predictions across monitored zones."""
    summary = RiskService.get_dashboard_summary(db)
    return summary.recent_predictions


@router.post("", response_model=PredictionResponse)
def compute_prediction(payload: PredictionRequest, db: Session = Depends(get_db)):
    """On-demand risk prediction for arbitrary geographic and meteorological inputs."""
    return RiskService.predict_risk(payload, db)