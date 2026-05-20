from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.core.database import get_db
from app.db.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionOut
import uuid

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("/", response_model=List[TransactionOut])
def list_transactions(
    limit: int = Query(50, le=200),
    offset: int = Query(0),
    type: Optional[str] = None,
    category: Optional[str] = None,
    risk_level: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Transaction)
    if type: query = query.filter(Transaction.type == type)
    if category: query = query.filter(Transaction.category == category)
    if risk_level: query = query.filter(Transaction.risk_level == risk_level)
    return query.order_by(Transaction.date.desc()).offset(offset).limit(limit).all()

@router.post("/", response_model=TransactionOut, status_code=201)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    from datetime import datetime
    from app.services.ml.anomaly_detector import AnomalyDetector
    
    tx = Transaction(
        user_id=uuid.uuid4(),  # would come from auth in production
        description=data.description,
        amount=data.amount,
        type=data.type,
        category=data.category,
        vendor=data.vendor,
        date=data.date or datetime.utcnow()
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

@router.get("/{transaction_id}", response_model=TransactionOut)
def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    tx = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return tx

@router.get("/export/csv")
def export_csv(db: Session = Depends(get_db)):
    from fastapi.responses import StreamingResponse
    import csv
    import io
    
    transactions = db.query(Transaction).order_by(Transaction.date.desc()).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Date", "Description", "Amount", "Type", "Category", "Risk Level"])
    for tx in transactions:
        writer.writerow([str(tx.id), tx.date, tx.description, tx.amount, tx.type, tx.category, tx.risk_level])
    output.seek(0)
    return StreamingResponse(output, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=transactions.csv"})
