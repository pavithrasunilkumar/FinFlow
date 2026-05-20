# FinFlow AI — API Reference

Base URL: `http://localhost:8000/api/v1`

Interactive docs: `http://localhost:8000/docs`

## Authentication

All endpoints except `/auth/register` and `/auth/login` require Bearer token.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/v1/analytics/overview
```

## Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, receive JWT |
| GET | `/auth/me` | Get current user |

### Analytics
| Method | Path | Description |
|--------|------|-------------|
| GET | `/analytics/overview` | Dashboard KPIs + charts |
| GET | `/analytics/revenue` | Revenue breakdown |
| GET | `/analytics/expenses` | Expense analytics |
| GET | `/analytics/cash-flow` | Cash flow data |
| GET | `/analytics/health-score` | Financial health score |
| GET | `/analytics/kpis` | All KPI metrics |

### AI Intelligence
| Method | Path | Description |
|--------|------|-------------|
| POST | `/ai/chat` | Chat with AI CFO |
| GET | `/ai/insights` | AI-generated insights |
| POST | `/ai/report` | Generate financial report |
| POST | `/ai/analyze` | Analyze financial data |

### ML Engine
| Method | Path | Description |
|--------|------|-------------|
| POST | `/ml/forecast` | Run ML forecasting |
| GET | `/ml/anomalies` | Get detected anomalies |
| GET | `/ml/health-score` | ML health score |
| POST | `/ml/upload-dataset` | Upload CSV for EDA |
| GET | `/ml/scenarios` | Bull/Base/Bear scenarios |

### Transactions
| Method | Path | Description |
|--------|------|-------------|
| GET | `/transactions` | List transactions |
| POST | `/transactions` | Create transaction |
| GET | `/transactions/{id}` | Get single transaction |
| GET | `/transactions/export/csv` | Export CSV |

### AI Agents
| Method | Path | Description |
|--------|------|-------------|
| GET | `/agents` | List all agents |
| POST | `/agents/{id}/run` | Execute agent |
| GET | `/agents/{id}/status` | Agent status |
