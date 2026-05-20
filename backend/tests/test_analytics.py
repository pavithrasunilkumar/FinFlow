"""Tests for FinFlow AI analytics endpoints"""
import pytest
from fastapi.testclient import TestClient

def test_analytics_import():
    """Verify analytics service imports correctly."""
    from app.services.analytics.financial_analytics import FinancialAnalyticsService
    assert FinancialAnalyticsService is not None

def test_health_scorer_import():
    import sys, os
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'ml-engine'))
    from scoring.health_scorer import FinancialHealthScorer
    scorer = FinancialHealthScorer()
    result = scorer.calculate()
    assert result['overall_score'] > 0
    assert result['grade'] in ['A+','A','A-','B+','B','B-','C']
