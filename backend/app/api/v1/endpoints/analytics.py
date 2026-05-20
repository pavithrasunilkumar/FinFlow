from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.services.analytics.financial_analytics import FinancialAnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/overview")
def get_overview(db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.get_dashboard_overview()

@router.get("/revenue")
def get_revenue(period: str = Query("12m"), db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.get_revenue_analytics(period)

@router.get("/expenses")
def get_expenses(period: str = Query("12m"), db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.get_expense_analytics(period)

@router.get("/cash-flow")
def get_cash_flow(db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.get_cash_flow_data()

@router.get("/health-score")
def get_health_score(db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.calculate_health_score()

@router.get("/kpis")
def get_kpis(db: Session = Depends(get_db)):
    service = FinancialAnalyticsService(db)
    return service.get_kpis()
