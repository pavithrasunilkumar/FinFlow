from sqlalchemy.orm import Session
from typing import Dict, Any, List
import uuid
from datetime import datetime, timedelta

class AnomalyDetector:
    def __init__(self, db: Session):
        self.db = db

    def get_recent_anomalies(self) -> Dict[str, Any]:
        return {
            "total_flagged": 3,
            "risk_exposure": 16000,
            "anomalies": [
                {
                    "id": str(uuid.uuid4()),
                    "transaction_id": "TXN-4821",
                    "description": "Vendor payment — Office Supplies",
                    "amount": 12800,
                    "anomaly_score": 0.942,
                    "risk_level": "high",
                    "deviation": 3.4,
                    "date": "2024-10-14",
                    "explanation": "Amount is 340% above 90-day baseline for this vendor category. Pattern matches known duplicate billing signature."
                },
                {
                    "id": str(uuid.uuid4()),
                    "transaction_id": "INV-DUP-092",
                    "description": "Suspected duplicate charge",
                    "amount": 3200,
                    "anomaly_score": 0.871,
                    "risk_level": "high",
                    "deviation": 2.1,
                    "date": "2024-11-19",
                    "explanation": "Transaction pattern identical to INV-089 processed Nov 3. High probability of duplicate billing."
                },
                {
                    "id": str(uuid.uuid4()),
                    "transaction_id": "VENDOR-GHK",
                    "description": "Contract pricing mismatch",
                    "amount": 8400,
                    "anomaly_score": 0.743,
                    "risk_level": "medium",
                    "deviation": 1.4,
                    "date": "2024-09-28",
                    "explanation": "Billed $8,400 vs contracted rate $7,200. Potential billing error — $1,200 recovery opportunity."
                }
            ]
        }
