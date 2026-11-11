from fastapi import APIRouter
from backend.app.api.v1.endpoints import dashboard, risk, predictions, alerts, weather, historical

api_router = APIRouter()

# Dashboard
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

# Risk & Risk Map
api_router.include_router(risk.router, tags=["Risk Intelligence"])

# Predictions
api_router.include_router(predictions.router, prefix="/predictions", tags=["Predictions Engine"])

# Alerts
api_router.include_router(alerts.router, prefix="/alerts", tags=["Early Warnings & Alerts"])

# Weather
api_router.include_router(weather.router, prefix="/weather", tags=["Meteorology"])

# Historical Data
api_router.include_router(historical.router, prefix="/historical-data", tags=["Historical Records"])

