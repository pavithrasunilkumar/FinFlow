from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, timedelta
import random
from typing import Dict, Any, List

class FinancialAnalyticsService:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard_overview(self) -> Dict[str, Any]:
        return {
            "kpis": {
                "revenue": 2840000,
                "expenses": 1993000,
                "profit": 847000,
                "cash_flow": 412000,
                "revenue_growth": 0.184,
                "expense_growth": -0.032,
                "profit_margin": 0.298,
                "health_score": 87
            },
            "revenue_trend": self._generate_monthly_trend("revenue"),
            "expense_trend": self._generate_monthly_trend("expense"),
            "expense_breakdown": [
                {"name": "Payroll", "value": 835560, "percentage": 42},
                {"name": "Marketing", "value": 438460, "percentage": 22},
                {"name": "Infrastructure", "value": 358740, "percentage": 18},
                {"name": "Operations", "value": 238760, "percentage": 12},
                {"name": "Other", "value": 119480, "percentage": 6}
            ],
            "health_dimensions": {
                "stability": 91,
                "efficiency": 84,
                "risk": 76,
                "forecast_confidence": 88
            }
        }

    def get_revenue_analytics(self, period: str) -> Dict[str, Any]:
        months = 12 if period == "12m" else 6
        return {
            "total_revenue": 2840000,
            "arr": 3410000,
            "mrr": 284000,
            "growth_rate": 0.184,
            "monthly_data": self._generate_monthly_trend("revenue"),
            "by_category": [
                {"category": "SaaS Subscriptions", "amount": 1420000, "percentage": 50},
                {"category": "Services", "amount": 682000, "percentage": 24},
                {"category": "Consulting", "amount": 454000, "percentage": 16},
                {"category": "Licensing", "amount": 284000, "percentage": 10}
            ]
        }

    def get_expense_analytics(self, period: str) -> Dict[str, Any]:
        return {
            "total_expenses": 1993000,
            "burn_rate": 166000,
            "growth_rate": -0.032,
            "monthly_data": self._generate_monthly_trend("expense"),
            "by_category": [
                {"category": "Payroll", "amount": 836460, "percentage": 42},
                {"category": "Marketing", "amount": 438460, "percentage": 22},
                {"category": "Infrastructure", "amount": 358740, "percentage": 18},
                {"category": "Operations", "amount": 238760, "percentage": 12},
                {"category": "Other", "amount": 120580, "percentage": 6}
            ]
        }

    def get_cash_flow_data(self) -> Dict[str, Any]:
        return {
            "net_cash_flow": 412000,
            "runway_months": 18.4,
            "monthly_data": [
                {"month": m, "inflow": v, "outflow": v * 0.75}
                for m, v in zip(
                    ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                    [185000, 212000, 198000, 235000, 260000, 248000, 275000, 292000, 268000, 305000, 288000, 318000]
                )
            ]
        }

    def calculate_health_score(self) -> Dict[str, Any]:
        return {
            "overall_score": 87,
            "grade": "A",
            "dimensions": {
                "financial_stability": 91,
                "operational_efficiency": 84,
                "business_risk": 76,
                "forecasting_confidence": 88
            },
            "summary": "Strong financial health across all dimensions. Primary risk: customer concentration (top 3 = 42% ARR)."
        }

    def get_kpis(self) -> Dict[str, Any]:
        return {
            "revenue": 2840000,
            "expenses": 1993000,
            "profit": 847000,
            "mrr": 284000,
            "arr": 3410000,
            "burn_rate": 166000,
            "runway": 18.4,
            "cac": 2210,
            "ltv": 18400,
            "churn_rate": 0.018
        }

    def _generate_monthly_trend(self, metric: str) -> List[Dict[str, Any]]:
        base_values = {
            "revenue": [185000, 212000, 198000, 235000, 260000, 248000, 275000, 292000, 268000, 305000, 288000, 318000],
            "expense": [142000, 165000, 154000, 178000, 195000, 188000, 208000, 220000, 203000, 228000, 215000, 236000]
        }
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        vals = base_values.get(metric, base_values["revenue"])
        return [{"month": m, "value": v} for m, v in zip(months, vals)]
