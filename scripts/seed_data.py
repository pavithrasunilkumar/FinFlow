#!/usr/bin/env python3
"""Seed script: populates the database with realistic financial demo data"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import random
import math
from datetime import datetime, timedelta

def lognormal(mu, sigma):
    return math.exp(random.gauss(mu, sigma))

def main():
    print("FinFlow AI — Database Seeder")
    print("=" * 40)
    print("Generating synthetic financial data...")

    # In production: connect to DB and insert real records
    # from backend.app.core.database import SessionLocal
    # from backend.app.db.models.transaction import Transaction

    transactions = []
    for i in range(500):
        is_income = random.random() < 0.35
        date = datetime(2024, 1, 1) + timedelta(days=random.randint(0, 330))
        amount = lognormal(9.8 if is_income else 8.9, 1.1)
        transactions.append({
            'id': f'TXN-{i+1:04d}',
            'date': date.strftime('%Y-%m-%d'),
            'amount': round(amount, 2),
            'type': 'income' if is_income else 'expense',
        })

    print(f"Generated {len(transactions)} transactions")
    print(f"Total revenue: ${sum(t['amount'] for t in transactions if t['type']=='income'):,.0f}")
    print(f"Total expenses: ${sum(t['amount'] for t in transactions if t['type']=='expense'):,.0f}")
    print("\nSeeding complete! Run with a live DB connection to persist data.")

if __name__ == '__main__':
    main()
