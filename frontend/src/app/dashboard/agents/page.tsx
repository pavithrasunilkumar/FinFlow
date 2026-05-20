'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const AGENTS = [
  { id: 'forecast-agent', name: 'Forecast Agent', icon: '🔮', status: 'running', description: 'Runs Prophet + XGBoost ensemble models to generate 90-day revenue, expense, and cash flow projections.', accuracy: '94.7%', processed: '2.4M rows', progress: 78, color: '#00d4ff',
    reasoning: ['Loading 12 months of financial data', 'Applying Prophet seasonality decomposition', 'Computing XGBoost feature importance', 'Generating ensemble prediction with CI'] },
  { id: 'expense-analyzer', name: 'Expense Analyzer', icon: '💸', status: 'running', description: 'Continuously categorizes, tags, and analyzes expense patterns against historical baselines and benchmarks.', accuracy: '97.1%', processed: '14.2K txns', progress: 92, color: '#10b981',
    reasoning: ['Ingesting transaction feed', 'Categorizing with NLP classifier', 'Benchmarking against industry data', 'Generating variance report'] },
  { id: 'budget-optimizer', name: 'Budget Optimizer', icon: '⚡', status: 'idle', description: 'Compares actual spend vs budget in real-time, flagging variances and recommending reallocation opportunities.', accuracy: '89.4%', processed: '8 categories', progress: 45, color: '#f59e0b',
    reasoning: ['Awaiting budget data sync', 'Ready to run variance analysis'] },
  { id: 'invoice-agent', name: 'Invoice Agent', icon: '📋', status: 'running', description: 'Automates invoice matching, payment tracking, AR aging analysis, and duplicate detection workflows.', accuracy: '99.2%', processed: '342 invoices', progress: 63, color: '#3b82f6',
    reasoning: ['Scanning invoice queue (342 items)', 'Cross-referencing PO database', 'Flagged 1 duplicate — INV-092', 'Generating AR aging report'] },
  { id: 'fraud-detection', name: 'Fraud Detection', icon: '🛡️', status: 'running', description: 'Isolation Forest model monitors transaction streams for anomalous patterns with real-time risk scoring.', accuracy: '96.8%', processed: '1.2M txns', progress: 100, color: '#ef4444',
    reasoning: ['Processing live transaction stream', 'Isolation Forest model active', 'Scored 1,240 transactions today', '3 anomalies flagged — risk: HIGH'] },
  { id: 'cash-flow-agent', name: 'Cash Flow Agent', icon: '💧', status: 'idle', description: 'Models cash in/out flows with 30-day rolling forecasts, runway calculations, and liquidity risk assessment.', accuracy: '91.3%', processed: '18.4mo runway', progress: 30, color: '#8b5cf6',
    reasoning: ['Cash flow model loaded', 'Runway: 18.4 months calculated', 'Ready for scenario simulation'] },
]

export default function AgentsPage() {
  const [runningAgents, setRunningAgents] = useState<string[]>([])
  const [outputs, setOutputs] = useState<Record<string, string>>({})

  const runAgent = (agentId: string) => {
    setRunningAgents(prev => [...prev, agentId])
    setTimeout(() => {
      setRunningAgents(prev => prev.filter(id => id !== agentId))
      setOutputs(prev => ({ ...prev, [agentId]: 'Agent completed successfully. View insights in the AI Insights panel.' }))
    }, 3000)
  }

  return (
    <div>
      <DashboardHeader
        title="AI Agents Control Center"
        subtitle="6 autonomous financial intelligence agents"
        actions={<button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600 hover:opacity-90 transition-opacity">Run All Agents</button>}
      />
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {AGENTS.map(agent => (
            <div key={agent.id} className="glass-card p-4 hover:border-[#243758] transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: agent.color + '18', border: '1px solid ' + agent.color + '33' }}>
                  {agent.icon}
                </div>
                <div className={cn('flex items-center gap-1.5 text-[10px] font-mono',
                  agent.status === 'running' ? 'text-emerald-400' : 'text-gray-500')}>
                  <div className={cn('w-1.5 h-1.5 rounded-full', agent.status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600')} />
                  {agent.status.toUpperCase()}
                </div>
              </div>
              <div className="font-display font-700 text-sm mb-1">{agent.name}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed mb-3">{agent.description}</div>

              {/* Reasoning */}
              <div className="mb-3 p-2 rounded-lg bg-white/2 border border-[#1e2d4a]">
                <div className="text-[9px] text-gray-500 mb-1 tracking-wider">AGENT REASONING</div>
                <div className="flex flex-col gap-1">
                  {agent.reasoning.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <div className="w-1 h-1 rounded-full" style={{ background: agent.color }} />
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mb-2">
                <div><div className="text-[10px] text-gray-500">PROCESSED</div><div className="text-xs font-600">{agent.processed}</div></div>
                <div><div className="text-[10px] text-gray-500">ACCURACY</div><div className="text-xs font-600" style={{ color: agent.color }}>{agent.accuracy}</div></div>
              </div>
              <div className="mb-3 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: agent.progress + '%', background: agent.color }} />
              </div>
              {outputs[agent.id] && (
                <div className="text-[10px] text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 rounded p-2 mb-2">{outputs[agent.id]}</div>
              )}
              <button
                onClick={() => runAgent(agent.id)}
                disabled={runningAgents.includes(agent.id)}
                className={cn('w-full text-xs py-1.5 rounded-lg border transition-all font-600',
                  runningAgents.includes(agent.id)
                    ? 'border-gray-600 text-gray-500 cursor-not-allowed'
                    : 'border-[#1e2d4a] text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400'
                )}>
                {runningAgents.includes(agent.id) ? '⟳ Running...' : '▷ Run Agent'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
