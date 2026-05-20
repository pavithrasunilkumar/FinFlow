import pandas as pd
import numpy as np
from typing import Dict, Any, Tuple

class FinancialDataPreprocessor:
    def __init__(self):
        self.fitted = False

    def fit_transform(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        df = df.copy()
        numeric = df.select_dtypes(include='number').columns
        for col in numeric:
            df[col] = df[col].fillna(df[col].median())
        stats = {'rows': len(df), 'columns': len(df.columns),
                 'data_quality_score': 1 - df.isnull().sum().sum() / max(df.size, 1)}
        self.fitted = True
        return df, stats

    def generate_synthetic(self, months: int = 24) -> pd.DataFrame:
        rows = []
        for m in range(months):
            for _ in range(20):
                growth = 1.015 ** m
                cat = np.random.choice(['Revenue','Marketing','Payroll','Infrastructure'], p=[0.4,0.2,0.25,0.15])
                amount = round(np.random.lognormal(9.5, 1.0) * growth, 2)
                rows.append({'month': m+1, 'category': cat, 'amount': amount, 'type': 'expense' if cat != 'Revenue' else 'income'})
        return pd.DataFrame(rows)
