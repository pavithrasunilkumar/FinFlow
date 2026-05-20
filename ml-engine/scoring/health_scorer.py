from typing import Dict, Any

class FinancialHealthScorer:
    WEIGHTS = {'stability': 0.30, 'efficiency': 0.25, 'risk': 0.25, 'forecast': 0.20}

    def calculate(self, metrics: Dict[str, Any] = None) -> Dict[str, Any]:
        if metrics is None:
            metrics = {'runway_months': 18.4, 'gross_margin': 0.723, 'open_anomalies': 3,
                       'customer_concentration': 0.42, 'churn_rate': 0.018, 'forecast_accuracy': 0.947}
        scores = {
            'stability': min(100, 50 + (25 if metrics.get('runway_months', 0) >= 18 else 10)),
            'efficiency': min(100, 40 + (30 if metrics.get('gross_margin', 0) >= 0.70 else 15)),
            'risk': max(0, 80 - metrics.get('open_anomalies', 0) * 5 - (10 if metrics.get('customer_concentration', 0) > 0.3 else 0)),
            'forecast': min(100, metrics.get('forecast_accuracy', 0.9) * 100),
        }
        overall = sum(scores[k] * self.WEIGHTS[k] for k in scores)
        grade = 'A' if overall >= 85 else 'B+' if overall >= 78 else 'B'
        return {'overall_score': round(overall), 'grade': grade, 'dimensions': {k: round(v) for k, v in scores.items()}}
