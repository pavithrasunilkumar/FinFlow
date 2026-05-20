from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class KPIData(BaseModel):
    revenue: float
    expenses: float
    profit: float
    cash_flow: float
    revenue_growth: float
    expense_growth: float
    profit_margin: float
    health_score: float

class ChartDataPoint(BaseModel):
    label: str
    value: float
    secondary_value: Optional[float] = None

class AnalyticsOverview(BaseModel):
    kpis: KPIData
    revenue_trend: List[ChartDataPoint]
    expense_breakdown: List[Dict[str, Any]]
    monthly_summary: List[Dict[str, Any]]
