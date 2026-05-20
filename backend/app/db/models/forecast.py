from sqlalchemy import Column, String, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    forecast_type = Column(String, nullable=False)
    horizon_days = Column(Integer, default=90)
    model_used = Column(String, default="prophet")
    accuracy_score = Column(Float)
    predictions = Column(JSONB, default=list)
    confidence_upper = Column(JSONB, default=list)
    confidence_lower = Column(JSONB, default=list)
    scenario_bull = Column(JSONB, default=dict)
    scenario_base = Column(JSONB, default=dict)
    scenario_bear = Column(JSONB, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Integer
