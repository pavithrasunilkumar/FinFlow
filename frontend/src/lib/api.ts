import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('finflow_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('finflow_token')
    }
    return Promise.reject(error)
  }
)

export const analyticsApi = {
  getOverview: () => api.get('/analytics/overview'),
  getRevenue: (period = '12m') => api.get('/analytics/revenue', { params: { period } }),
  getExpenses: (period = '12m') => api.get('/analytics/expenses', { params: { period } }),
  getCashFlow: () => api.get('/analytics/cash-flow'),
  getHealthScore: () => api.get('/analytics/health-score'),
  getKPIs: () => api.get('/analytics/kpis'),
}

export const transactionsApi = {
  list: (params = {}) => api.get('/transactions', { params }),
  create: (data: Record<string, unknown>) => api.post('/transactions', data),
  get: (id: string) => api.get('/transactions/' + id),
  exportCSV: () => api.get('/transactions/export/csv', { responseType: 'blob' }),
}

export const aiApi = {
  chat: (message: string, sessionId?: string) => api.post('/ai/chat', { message, session_id: sessionId }),
  getInsights: () => api.get('/ai/insights'),
  generateReport: (type: string) => api.post('/ai/report', { report_type: type }),
  analyze: (data: Record<string, unknown>) => api.post('/ai/analyze', data),
}

export const mlApi = {
  forecast: (type: string, horizon = 90) => api.post('/ml/forecast', null, { params: { forecast_type: type, horizon_days: horizon } }),
  getAnomalies: () => api.get('/ml/anomalies'),
  getHealthScore: () => api.get('/ml/health-score'),
  uploadDataset: (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return api.post('/ml/upload-dataset', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getScenarios: () => api.get('/ml/scenarios'),
}

export const agentsApi = {
  list: () => api.get('/agents'),
  run: (agentId: string) => api.post('/agents/' + agentId + '/run'),
  getStatus: (agentId: string) => api.get('/agents/' + agentId + '/status'),
}

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (email: string, password: string, full_name: string) => api.post('/auth/register', { email, password, full_name }),
  me: () => api.get('/auth/me'),
}
