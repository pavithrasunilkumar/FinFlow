from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.ai_schemas import ChatRequest, ChatResponse, ReportRequest, AgentRunRequest
from app.services.ai.llm_service import LLMService
from app.services.ai.agent_service import AgentService
import uuid

router = APIRouter(prefix="/ai", tags=["AI Intelligence"])

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest, db: Session = Depends(get_db)):
    service = LLMService()
    session_id = request.session_id or str(uuid.uuid4())
    response = await service.chat(request.message, session_id, request.context)
    return ChatResponse(
        response=response["text"],
        session_id=session_id,
        sources=response.get("sources"),
        confidence=response.get("confidence", 0.87)
    )

@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    return {
        "insights": [
            {
                "id": str(uuid.uuid4()),
                "title": "Revenue acceleration detected",
                "description": "Q4 revenue trajectory suggests 24% YoY growth. SaaS MRR compounding at 8.3% monthly — outpacing industry median by 2.1x.",
                "category": "revenue",
                "severity": "positive",
                "confidence_score": 0.94,
                "created_at": "2024-11-28T10:30:00Z"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Anomaly detected in vendor payments",
                "description": "3 transactions flagged: vendor TXN-4821 shows 340% deviation from baseline. Isolation Forest confidence: 94.2%.",
                "category": "anomaly",
                "severity": "critical",
                "confidence_score": 0.94,
                "created_at": "2024-11-28T09:15:00Z"
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Cost optimization opportunity",
                "description": "Infrastructure costs 18% above cohort benchmarks. Rightsizing analysis identifies $23K/mo savings potential.",
                "category": "optimization",
                "severity": "warning",
                "confidence_score": 0.88,
                "created_at": "2024-11-28T08:00:00Z"
            }
        ]
    }

@router.post("/report")
async def generate_report(request: ReportRequest, db: Session = Depends(get_db)):
    service = LLMService()
    report = await service.generate_report(request.report_type, request.date_from, request.date_to)
    return {"report": report, "format": request.format}

@router.post("/analyze")
async def analyze_data(data: dict, db: Session = Depends(get_db)):
    service = LLMService()
    analysis = await service.analyze_financial_data(data)
    return {"analysis": analysis}
