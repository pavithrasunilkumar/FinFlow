'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'

const CRITICAL = [
  { icon:'🚨', title:'Unusual vendor payment pattern', desc:'Vendor ID V-4821 shows 340% spike on Oct 14. Pattern matches known duplicate billing signature. Risk: HIGH.', action:'Hold and investigate', color:'#ef4444' },
  { icon:'⚡', title:'Cash conversion cycle lengthening', desc:'CCC increased from 34 to 52 days over 90-day window. AR aging: 18% of receivables past 60 days — up from 11%.', action:'Review AR aging', color:'#f59e0b' },
  { icon:'📊', title:'Margin compression trend', desc:'Gross margin decreased 1.8pp over 3 months. Primary driver: cloud infrastructure costs scaling faster than revenue.', action:'Infrastructure audit', color:'#f59e0b' },
]
const OPPORTUNITIES = [
  { icon:'💰', title:'SaaS tool consolidation', desc:'AI agent identified 7 overlapping SaaS subscriptions totaling $2,840/month. Consolidation path saves $23K annually.', savings:'$23K/yr', color:'#10b981' },
  { icon:'🎯', title:'Marketing spend reallocation', desc:'CAC analysis: organic content shows 3.2x better CAC than paid social. Reallocating 20% projects 14% CAC improvement.', savings:'$18K/yr', color:'#00d4ff' },
  { icon:'🏗️', title:'Reserved instance savings', desc:'Current on-demand cloud spend qualifies for 1-year reserved capacity. Saves $43K/year with 94% confidence.', savings:'$43K/yr', color:'#10b981' },
  { icon:'📈', title:'Revenue expansion opportunity', desc:'Top 20% of customers show 8x LTV vs average. AI identifies 12 expansion candidates with upsell probability >70%.', savings:'$84K ARR', color:'#8b5cf6' },
]

export default function InsightsPage() {
  return (
    <div>
      <DashboardHeader title="AI Insights Center" subtitle="Generative financial intelligence at enterprise scale" actions={
        <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600">Generate Report</button>
      }/>
      <div className="p-6 flex flex-col gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="text-4xl">🧠</div>
          <div className="flex-1">
            <div className="font-display font-700 text-base mb-1">AI Analysis Complete</div>
            <div className="text-xs text-gray-400 leading-relaxed">FinFlow AI has processed 12 months of financial data and generated 24 actionable insights across 6 business dimensions. Anomaly detection flagged 3 high-priority items requiring review.</div>
          </div>
          <div className="text-right">
            <div className="font-display font-800 text-2xl gradient-cyan">$89K</div>
            <div className="text-[10px] text-gray-500">SAVINGS IDENTIFIED</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-700 text-sm">🔴 Critical Alerts</h3>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded">3 ITEMS</span>
            </div>
            <div className="flex flex-col divide-y divide-[#1e2d4a]">
              {CRITICAL.map((item, i) => (
                <div key={i} className="py-3 first:pt-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: item.color+'18', border:'1px solid '+item.color+'33' }}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs font-600 mb-1">{item.title}</div>
                      <div className="text-[11px] text-gray-400 leading-relaxed mb-2">{item.desc}</div>
                      <div className="text-[10px] font-mono" style={{ color: item.color }}>→ {item.action}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-700 text-sm">💡 Optimization Opportunities</h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">$89K SAVINGS</span>
            </div>
            <div className="flex flex-col divide-y divide-[#1e2d4a]">
              {OPPORTUNITIES.map((item, i) => (
                <div key={i} className="py-3 first:pt-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: item.color+'18', border:'1px solid '+item.color+'33' }}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs font-600 mb-1">{item.title}</div>
                      <div className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</div>
                    </div>
                    <div className="text-xs font-mono font-600 text-emerald-400 flex-shrink-0">{item.savings}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
