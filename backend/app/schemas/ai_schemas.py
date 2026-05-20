from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    sources: Optional[List[str]] = None
    confidence: Optional[float] = None

class InsightOut(BaseModel):
    id: str
    title: str
    description: str
    category: str
    severity: str
    confidence_score: float
    created_at: str

class ReportRequest(BaseModel):
    report_type: str
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    format: str = "pdf"

class AgentRunRequest(BaseModel):
    agent_id: str
    parameters: Optional[Dict[str, Any]] = None
