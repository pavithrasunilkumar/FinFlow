#!/usr/bin/env python3
"""Generate synthetic financial datasets for development and testing"""
import csv
import random
import math
import os
from datetime import datetime, timedelta

def lognormal(mu, sigma):
    return math.exp(random.gauss(mu, sigma))

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'datasets')

def generate_transactions(n=1000, filepath=None):
    """Generate realistic transaction records"""
    if not filepath:
        filepath = os.path.join(OUTPUT_DIR, 'transactions.csv')
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    income = [('SaaS Subscriptions','Stripe'),('Enterprise License','Direct'),('Consulting Fees','Direct'),('Professional Services','PayPal')]
    expense = [('Payroll - Engineering','Gusto'),('Payroll - Marketing','Gusto'),('AWS Compute','Amazon'),
               ('Meta Ads','Meta'),('Google Ads','Google'),('SaaS Tools','Various'),('Office Operations','Various')]
    
    rows = [['id','date','description','amount','type','category','vendor','risk_level','anomaly_score']]
    
    for i in range(n):
        is_income = random.random() < 0.38
        date = datetime(2023, 1, 1) + timedelta(days=random.randint(0, 700))
        if is_income:
            cat, vendor = random.choice(income)
            amount = round(lognormal(10.1, 1.0), 2)
            risk = 'low'
            anomaly = round(random.uniform(0.01, 0.15), 3)
        else:
            cat, vendor = random.choice(expense)
            amount = round(lognormal(9.2, 1.2), 2)
            inject_anomaly = random.random() < 0.04
            risk = 'high' if inject_anomaly else 'medium' if random.random() < 0.08 else 'low'
            anomaly = round(random.uniform(0.75, 0.98), 3) if inject_anomaly else round(random.uniform(0.01, 0.25), 3)
        
        rows.append([f'TXN-{i+1:04d}', date.strftime('%Y-%m-%d'),
                     f'{cat} #{i+1:03d}', amount,
                     'income' if is_income else 'expense',
                     cat, vendor, risk, anomaly])
    
    with open(filepath, 'w', newline='') as f:
        csv.writer(f).writerows(rows)
    
    print(f"Generated {n} transactions → {filepath}")
    return rows

if __name__ == '__main__':
    generate_transactions(1000)
    print("All datasets generated successfully!")
