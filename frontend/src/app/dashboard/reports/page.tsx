'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import { useState } from 'react'

const REPORTS = [
  { id:'monthly-exec', title:'Monthly Executive Summary', desc:'High-level financial performance overview for board and executive stakeholders.', pages:8, updated:'Nov 28', status:'ready', icon:'📋' },
  { id:'q4-analysis', title:'Q4 Revenue Analysis', desc:'Detailed breakdown of Q4 revenue streams, growth drivers, and YoY comparison.', pages:14, updated:'Nov 25', status:'ready', icon:'📊' },
  { id:'cashflow-report', title:'Cash Flow Projection Report', desc:'12-month cash flow forecasting with scenario analysis and runway modeling.', pages:10, updated:'Nov 22', status:'ready', icon:'💧' },
  { id:'anomaly-report', title:'Anomaly Detection Report', desc:'AI-generated analysis of flagged transactions and risk exposure assessment.', pages:6, updated:'Nov 28', status:'new', icon:'🛡️' },
  { id:'budget-variance', title:'Budget Variance Analysis', desc:'Actual vs. budgeted spend across all cost centers with variance explanations.', pages:12, updated:'Nov 20', status:'ready', icon:'📈' },
  { id:'investor-memo', title:'Investor Memo — Q4', desc:'Investor-grade financial memo with KPIs, milestones, and forward guidance.', pages:5, updated:'Nov 18', status:'generating', icon:'🎯' },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)
  const [generated, setGenerated] = useState<string[]>([])

  const generate = (id: string) => {
    setGenerating(id)
    setTimeout(() => {
      setGenerating(null)
      setGenerated(prev => [...prev, id])
    }, 2500)
  }

  return (
    <div>
      <DashboardHeader title="AI Report Generator" subtitle="Executive-grade financial reports, generated on-demand" actions={
        <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600">+ New Report</button>
      }/>
      <div className="p-6 flex flex-col gap-4">
        <div className="glass-card p-4 flex items-center gap-4 border-cyan-400/20" style={{background:'linear-gradient(135deg,rgba(0,212,255,0.05),rgba(59,130,246,0.03))'}}>
          <div className="text-3xl">🤖</div>
          <div>
            <div className="font-display font-700 text-sm mb-1">AI Report Generation Engine</div>
            <div className="text-xs text-gray-400">LangChain + GPT-4 generates professional financial reports from your live data. Board-ready in seconds.</div>
          </div>
          <button className="ml-auto text-xs px-4 py-2 rounded-lg bg-cyan-400 text-black font-600 whitespace-nowrap">Generate Custom Report</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {REPORTS.map(r => (
            <div key={r.id} className="glass-card p-4 hover:border-[#243758] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{r.icon}</div>
                <div className={`text-[10px] font-mono px-2 py-0.5 rounded ${r.status==='new'?'bg-cyan-400/10 text-cyan-400':r.status==='generating'?'bg-amber-400/10 text-amber-400':'bg-emerald-400/10 text-emerald-400'}`}>
                  {r.status.toUpperCase()}
                </div>
              </div>
              <div className="font-display font-700 text-xs mb-1.5">{r.title}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed mb-3">{r.desc}</div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                <span>{r.pages} pages</span>
                <span>·</span>
                <span>Updated {r.updated}</span>
              </div>
              {generated.includes(r.id) ? (
                <div className="flex gap-2">
                  <button className="flex-1 text-[11px] py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-600">✓ Download PDF</button>
                  <button className="text-[11px] px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-gray-400">CSV</button>
                </div>
              ) : (
                <button onClick={() => generate(r.id)} disabled={generating===r.id}
                  className="w-full text-[11px] py-1.5 rounded-lg border border-[#1e2d4a] text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all">
                  {generating===r.id ? '⟳ Generating...' : 'Generate Report'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
