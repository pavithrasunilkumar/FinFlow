from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from app.core.config import settings
from app.api.v1.endpoints import auth, analytics, transactions, ai_endpoints, ml_endpoints, agents

app = FastAPI(
    title="FinFlow AI API",
    description="Enterprise AI-powered financial intelligence platform",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(transactions.router, prefix=settings.API_V1_STR)
app.include_router(ai_endpoints.router, prefix=settings.API_V1_STR)
app.include_router(ml_endpoints.router, prefix=settings.API_V1_STR)
app.include_router(agents.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"name": "FinFlow AI", "version": settings.APP_VERSION, "status": "operational"}

@app.get("/health")
def health():
    return {"status": "healthy", "version": settings.APP_VERSION}
