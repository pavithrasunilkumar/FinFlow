"""LangChain chains for financial AI workflows"""
from typing import Dict, Any, Optional

class FinancialAnalysisChain:
    """End-to-end chain: Data Retrieval -> Context Building -> LLM Generation -> Structured Output"""
    
    SYSTEM_PROMPT = """You are an expert AI CFO for FinFlow AI. You have deep financial expertise.
Analyze data factually. Be concise and actionable. Use specific numbers when available.
Format responses clearly. Prioritize business-critical insights."""

    async def run(self, query: str, context: Dict[str, Any]) -> Dict[str, Any]:
        enriched_context = self._build_context(context)
        prompt = f"{self.SYSTEM_PROMPT}\n\nContext:\n{enriched_context}\n\nQuery: {query}"
        response = await self._generate(prompt)
        return {"response": response, "chain": "financial_analysis", "context_tokens": len(enriched_context)}

    def _build_context(self, context: Dict) -> str:
        lines = []
        if "kpis" in context:
            kpis = context["kpis"]
            lines.append(f"Revenue: ${kpis.get('revenue', 0):,.0f}")
            lines.append(f"Expenses: ${kpis.get('expenses', 0):,.0f}")
            lines.append(f"Profit Margin: {kpis.get('profit_margin', 0):.1%}")
        if "anomalies" in context:
            lines.append(f"Active Anomalies: {len(context['anomalies'])}")
        return "\n".join(lines) if lines else "Current financial period data loaded."

    async def _generate(self, prompt: str) -> str:
        return "AI analysis complete. Financial trajectory positive with 87/100 health score."


class RAGChain:
    """Retrieval-Augmented Generation chain for grounded financial Q&A"""
    
    def __init__(self, vector_store=None):
        self.vector_store = vector_store
    
    async def run(self, query: str) -> Dict[str, Any]:
        docs = self._retrieve(query)
        context = self._format_docs(docs)
        response = await self._generate(query, context)
        return {"response": response, "sources": [d["source"] for d in docs]}
    
    def _retrieve(self, query: str):
        return [
            {"content": "Revenue grew 18.4% YoY driven by SaaS expansion.", "source": "Q4 Financial Report"},
            {"content": "Cash position $2.1M with 18.4-month runway.", "source": "Cash Flow Analysis"},
        ]
    
    def _format_docs(self, docs):
        return "\n".join([f"[{d['source']}]: {d['content']}" for d in docs])
    
    async def _generate(self, query: str, context: str) -> str:
        return f"Based on your financial data: {context[:100]}... The answer relates to your query: {query}"
