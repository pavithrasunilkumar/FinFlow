from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class TransactionCreate(BaseModel):
    description: str
    amount: float
    type: str
    category: Optional[str] = None
    vendor: Optional[str] = None
    date: Optional[datetime] = None

class TransactionOut(BaseModel):
    id: UUID
    description: str
    amount: float
    type: str
    category: Optional[str]
    vendor: Optional[str]
    date: datetime
    risk_level: str
    anomaly_score: float
    is_anomaly: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionFilter(BaseModel):
    type: Optional[str] = None
    category: Optional[str] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    risk_level: Optional[str] = None
    limit: int = 50
    offset: int = 0
