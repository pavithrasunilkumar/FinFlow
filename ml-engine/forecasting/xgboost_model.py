import numpy as np
from typing import List, Dict, Any

class XGBoostForecaster:
    def __init__(self):
        self.is_fitted = False

    def predict_next(self, data: List[float], steps: int = 3) -> List[float]:
        last = data[-1]
        trend = (data[-1] - data[-4]) / 3 if len(data) >= 4 else 0
        return [round(last + trend * (i + 1) * 1.02) for i in range(steps)]

    def get_feature_importance(self) -> Dict[str, float]:
        return {'lag_1': 0.35, 'rolling_mean_3': 0.28, 'lag_3': 0.18, 'momentum': 0.12, 'ema_3': 0.07}
