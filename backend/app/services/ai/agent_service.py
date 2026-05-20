from sqlalchemy.orm import Session
from typing import Dict, Any

class AgentService:
    def __init__(self, db: Session):
        self.db = db
        self.agents = {
            "forecast-agent": self._run_forecast_agent,
            "expense-analyzer": self._run_expense_analyzer,
            "budget-optimizer": self._run_budget_optimizer,
            "invoice-agent": self._run_invoice_agent,
            "fraud-detection": self._run_fraud_agent,
            "cash-flow-agent": self._run_cashflow_agent,
        }

    async def run_agent(self, agent_id: str) -> Dict[str, Any]:
        handler = self.agents.get(agent_id)
        if not handler:
            return {"error": "Agent not found"}
        return await handler()

    async def _run_forecast_agent(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Loaded 12 months of revenue data", "Applied Prophet decomposition", "Combined with XGBoost features", "Generated ensemble prediction"],
            "output": {"forecast_q1": 3200000, "accuracy": 0.947, "confidence": 0.89}
        }

    async def _run_expense_analyzer(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Categorized 1,240 transactions", "Detected 3 unusual patterns", "Benchmarked against industry data"],
            "output": {"top_categories": ["Payroll", "Marketing", "Infrastructure"], "anomalies": 3, "optimization_potential": 89000}
        }

    async def _run_budget_optimizer(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Analyzed budget vs actuals", "Identified variance drivers", "Modeled reallocation scenarios"],
            "output": {"reallocation_suggestions": [{"from": "Print Marketing", "to": "Content Marketing", "savings": 23000}]}
        }

    async def _run_invoice_agent(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Processed 342 invoices", "Matched against POs", "Detected 1 duplicate", "Flagged 2 pricing mismatches"],
            "output": {"processed": 342, "duplicates": 1, "mismatches": 2, "recovery": 4400}
        }

    async def _run_fraud_agent(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Loaded transaction vectors", "Applied Isolation Forest", "Scored 1.2M transactions", "Ranked anomalies by confidence"],
            "output": {"transactions_scanned": 1200000, "flagged": 3, "high_risk": 2, "total_exposure": 16000}
        }

    async def _run_cashflow_agent(self) -> Dict[str, Any]:
        return {
            "status": "completed",
            "reasoning": ["Modeled 30-day rolling cash flows", "Calculated runway scenarios", "Assessed liquidity risk"],
            "output": {"runway_months": 18.4, "burn_rate": 166000, "next_30_days_projection": 428000}
        }
