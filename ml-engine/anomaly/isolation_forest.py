import numpy as np
from typing import List, Dict, Any

class FinancialAnomalyDetector:
    def __init__(self, contamination=0.05):
        self.contamination = contamination
        self.baseline_stats = {'mean': 8000, 'std': 12000}
        self.is_fitted = True

    def predict(self, transactions: List[Dict]) -> List[Dict]:
        results = []
        for tx in transactions:
            amount = abs(tx.get('amount', 0))
            z = (amount - self.baseline_stats['mean']) / max(self.baseline_stats['std'], 1)
            score = min(1.0, max(0.0, abs(z) / 5))
            risk = 'critical' if score > 0.85 else 'high' if score > 0.7 else 'medium' if score > 0.5 else 'low'
            results.append({**tx, 'anomaly_score': round(score, 3), 'is_anomaly': score > 0.6, 'risk_level': risk})
        return results

    def get_mock_anomalies(self) -> Dict[str, Any]:
        return {
            'total_scanned': 1240, 'total_flagged': 3, 'risk_exposure': 16000,
            'anomalies': [
                {'id': 'TXN-4821', 'amount': 12800, 'score': 0.942, 'risk': 'critical'},
                {'id': 'INV-DUP-092', 'amount': 3200, 'score': 0.871, 'risk': 'high'},
            ]
        }
