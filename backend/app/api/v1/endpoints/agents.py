from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
import uuid

router = APIRouter(prefix="/agents", tags=["AI Agents"])

AGENTS = [
    {"id": "forecast-agent", "name": "Forecast Agent", "status": "running", "description": "Prophet + XGBoost ensemble forecasting", "accuracy": "94.7%", "processed": "2.4M rows"},
    {"id": "expense-analyzer", "name": "Expense Analyzer", "status": "running", "description": "Real-time expense categorization and trend analysis", "accuracy": "97.1%", "processed": "14.2K txns"},
    {"id": "budget-optimizer", "name": "Budget Optimizer", "status": "idle", "description": "Budget variance monitoring and reallocation", "accuracy": "89.4%", "processed": "8 categories"},
    {"id": "invoice-agent", "name": "Invoice Agent", "status": "running", "description": "Invoice matching, AR aging, duplicate detection", "accuracy": "99.2%", "processed": "342 invoices"},
    {"id": "fraud-detection", "name": "Fraud Detection", "status": "running", "description": "Isolation Forest transaction monitoring", "accuracy": "96.8%", "processed": "1.2M txns"},
    {"id": "cash-flow-agent", "name": "Cash Flow Agent", "status": "idle", "description": "30-day rolling cash flow modeling", "accuracy": "91.3%", "processed": "18.4mo runway"},
]

@router.get("/")
def list_agents():
    return {"agents": AGENTS}

@router.post("/{agent_id}/run")
async def run_agent(agent_id: str, db: Session = Depends(get_db)):
    agent = next((a for a in AGENTS if a["id"] == agent_id), None)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    from app.services.ai.agent_service import AgentService
    service = AgentService(db)
    result = await service.run_agent(agent_id)
    return {"agent_id": agent_id, "status": "completed", "output": result}

@router.get("/{agent_id}/status")
def get_agent_status(agent_id: str):
    agent = next((a for a in AGENTS if a["id"] == agent_id), None)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent
