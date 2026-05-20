from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.ml.forecasting_service import ForecastingService
from app.services.ml.anomaly_detector import AnomalyDetector
from app.services.ml.health_scorer import HealthScorer
from app.services.ml.eda_service import EDAService
import uuid

router = APIRouter(prefix="/ml", tags=["ML Engine"])

@router.post("/forecast")
async def run_forecast(
    forecast_type: str = "revenue",
    horizon_days: int = 90,
    db: Session = Depends(get_db)
):
    service = ForecastingService(db)
    result = await service.run_forecast(forecast_type, horizon_days)
    return result

@router.get("/anomalies")
def get_anomalies(db: Session = Depends(get_db)):
    detector = AnomalyDetector(db)
    return detector.get_recent_anomalies()

@router.get("/health-score")
def get_health_score(db: Session = Depends(get_db)):
    scorer = HealthScorer(db)
    return scorer.calculate()

@router.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.csv', '.xlsx', '.json')):
        raise HTTPException(status_code=400, detail="Only CSV, Excel, JSON files supported")
    content = await file.read()
    eda_service = EDAService()
    result = await eda_service.analyze(content, file.filename)
    return result

@router.get("/scenarios")
def get_scenarios(db: Session = Depends(get_db)):
    return {
        "bull_case": {"revenue": 3890000, "growth": 0.22, "probability": 0.28},
        "base_case": {"revenue": 3200000, "growth": 0.127, "probability": 0.54},
        "bear_case": {"revenue": 2930000, "growth": 0.03, "probability": 0.18}
    }
