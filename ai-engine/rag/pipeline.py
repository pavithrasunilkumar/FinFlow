"""RAG Pipeline — Financial document retrieval and grounded generation"""
from typing import List, Dict, Any

class FinancialRAGPipeline:
    """Retrieval-Augmented Generation pipeline for financial data Q&A"""
    
    def __init__(self, persist_dir: str = "./chroma_db"):
        self.persist_dir = persist_dir
        self.documents = self._load_mock_documents()
    
    def _load_mock_documents(self) -> List[Dict]:
        return [
            {"id":"doc1","content":"TTM Revenue: $2.84M. ARR: $3.41M. MRR: $284K. Revenue growth 18.4% YoY.","source":"Financial Summary","category":"kpis"},
            {"id":"doc2","content":"Cash position $2.1M. Monthly burn rate $166K. Runway: 18.4 months. Positive FCF for 7 consecutive months.","source":"Cash Flow Report","category":"cashflow"},
            {"id":"doc3","content":"3 anomalous transactions flagged. TXN-4821: $12,800 (340% above baseline). Risk exposure: $16,000.","source":"Anomaly Report","category":"risk"},
            {"id":"doc4","content":"Financial Health Score: 87/100. Stability: 91%. Efficiency: 84%. Risk: 76%. Forecast Confidence: 88%.","source":"Health Report","category":"health"},
            {"id":"doc5","content":"Gross margin 72.3%. CAC payback 4.2 months. LTV:CAC 8.3x. NRR 118%. Churn rate 1.8%.","source":"Unit Economics","category":"metrics"},
        ]
    
    def retrieve(self, query: str, k: int = 3) -> List[Dict]:
        query_lower = query.lower()
        scored = []
        for doc in self.documents:
            score = sum(1 for word in query_lower.split() if word in doc["content"].lower())
            scored.append((score, doc))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [doc for _, doc in scored[:k]]
    
    def build_context(self, docs: List[Dict]) -> str:
        return "\n\n".join([f"[{d['source']}]\n{d['content']}" for d in docs])
    
    async def query(self, question: str) -> Dict[str, Any]:
        docs = self.retrieve(question)
        context = self.build_context(docs)
        return {"context": context, "sources": [d["source"] for d in docs], "docs_retrieved": len(docs)}
