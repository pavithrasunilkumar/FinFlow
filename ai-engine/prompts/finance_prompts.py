"""Financial AI prompt templates"""

SYSTEM_PROMPT_CFO = """You are an expert AI CFO (Chief Financial Officer) for FinFlow AI.
You have deep expertise in financial analysis, forecasting, risk assessment, and business strategy.
You analyze real financial data and provide actionable, data-driven insights.

Guidelines:
- Be concise and business-focused
- Use specific numbers and percentages
- Prioritize actionable recommendations
- Flag risks with appropriate urgency
- Format with clear structure"""

EXPENSE_ANALYSIS_PROMPT = """Analyze the following expense data and identify:
1. Primary drivers of change
2. Categories above benchmark
3. Optimization opportunities
4. Risk factors

Expense Data: {expense_data}
Industry Benchmarks: {benchmarks}"""

FORECAST_SUMMARY_PROMPT = """Generate an executive forecast summary:

Model: {model_type}
Accuracy: {accuracy}
Horizon: {horizon_days} days

Predictions: {predictions}
Scenarios: Bull={bull}, Base={base}, Bear={bear}

Provide: Key assumptions, risks, confidence level, actionable recommendations."""

ANOMALY_EXPLANATION_PROMPT = """Explain this financial anomaly in business terms:

Transaction: {transaction_id}
Amount: ${amount:,.0f}
Anomaly Score: {score:.2f}
Deviation: {deviation}x from baseline
Category: {category}

Provide: Plain-language explanation, risk assessment, recommended action."""

REPORT_GENERATOR_PROMPT = """Generate a professional {report_type} financial report.
Period: {date_from} to {date_to}

Financial Data Summary:
{data_summary}

Format: Executive summary (2-3 sentences), Key metrics table, Top 3 insights, 3 recommendations, Risk flags.
Tone: Professional, data-driven, board-ready."""
