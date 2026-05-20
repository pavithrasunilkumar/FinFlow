'use client'
import { formatCurrency } from '@/lib/utils'
import DashboardHeader from '@/components/layout/DashboardHeader'
import KPICard from '@/components/dashboard/KPICard'
import ChartCard from '@/components/dashboard/ChartCard'
import InsightCard from '@/components/dashboard/InsightCard'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const revenueData = [185,212,198,235,260,248,275,292,268,305,288,318].map((v,i)=>({ month: MONTHS[i], revenue: v, expenses: [142,165,154,178,195,188,208,220,203,228,215,236][i] }))
const expenseBreakdown = [
  { name: 'Payroll', value: 42, color: '#3b82f6' },
  { name: 'Marketing', value: 22, color: '#10b981' },
  { name: 'Infrastructure', value: 18, color: '#00d4ff' },
  { name: 'Operations', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 6, color: '#8b5cf6' },
]
const insights = [
  { icon: '📈', title: 'Revenue acceleration detected', description: 'Q4 revenue trajectory suggests 24% YoY growth. SaaS MRR compounding at 8.3% monthly.', time: '2m ago', severity: 'positive' as const },
  { icon: '⚠️', title: 'Anomaly detected in vendor payments', description: '3 transactions flagged: vendor TXN-4821 shows 340% deviation. Isolation Forest confidence: 94.2%.', time: '8m ago', severity: 'critical' as const },
  { icon: '🔮', title: 'Next-quarter forecast ready', description: 'Prophet model projects $3.2M revenue (+12.7%) with 89% confidence interval.', time: '1h ago', severity: 'info' as const },
  { icon: '💡', title: 'Cost optimization opportunity', description: 'Infrastructure costs 18% above benchmarks. $23K/mo savings potential identified.', time: '3h ago', severity: 'warning' as const },
]

export default function OverviewPage() {
  return (
    <div>
      <DashboardHeader
        title="Financial Overview"
        subtitle="Real-time intelligence · Updated just now"
        actions={
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-gray-400 hover:text-white transition-colors">Export PDF</button>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600 hover:opacity-90 transition-opacity">+ Add Data</button>
          </div>
        }
      />
      <div className="p-6 flex flex-col gap-4">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-3">
          <KPICard label="Total Revenue" value="$2.84M" change={0.184} valueColor="text-white"
            sparkData={[185,212,198,235,260,248,275,292,268,305,288,318]} />
          <KPICard label="Net Profit" value="$847K" change={0.221} valueColor="text-emerald-400"
            sparkData={[60,72,65,80,88,82,95,100,92,108,98,115]} />
          <KPICard label="Total Expenses" value="$1.99M" change={-0.032} valueColor="text-red-400"
            sparkData={[142,165,154,178,195,188,208,220,203,228,215,236]} />
          <KPICard label="Cash Flow" value="+$412K" change={0.315} valueColor="text-cyan-400"
            sparkData={[43,47,44,57,65,60,67,72,65,77,73,82]} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ChartCard title="Revenue vs Expenses — 12 Month Trend" badge="LIVE">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                  <XAxis dataKey="month" tick={{ fill: '#4a6080', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#4a6080', fontSize: 10 }} tickFormatter={v => '$'+v+'K'} />
                  <Tooltip contentStyle={{ background: '#0d1425', border: '1px solid #1e2d4a', borderRadius: 8 }} labelStyle={{ color: '#8ba3c7' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#00d4ff" fill="url(#revGrad)" strokeWidth={2} dot={false} name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} dot={false} strokeDasharray="5 3" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          <div className="flex flex-col gap-4">
            {/* Health Score */}
            <div className="glass-card p-4">
              <div className="text-center mb-3">
                <div className="font-display text-5xl font-800 gradient-cyan">87</div>
                <div className="text-[10px] text-gray-500 tracking-widest mt-1">FINANCIAL HEALTH INDEX</div>
              </div>
              <div className="flex flex-col gap-2">
                {[['Stability','91%', 0.91], ['Efficiency','84%', 0.84], ['Risk','76%', 0.76], ['Forecast','88%', 0.88]].map(([l,v,p]) => (
                  <div key={l as string} className="flex items-center gap-2 text-[11px]">
                    <div className="text-gray-400 w-16 text-right">{l}</div>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: v as string }} />
                    </div>
                    <div className="text-gray-500 w-7 font-mono text-[10px]">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <InsightCard insights={insights} title="AI-Generated Insights" badge="4 NEW" />
          </div>
          <ChartCard title="Expense Breakdown">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0d1425', border: '1px solid #1e2d4a', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {expenseBreakdown.map(e => (
                <div key={e.name} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <div className="w-2 h-2 rounded-sm" style={{ background: e.color }} />
                  {e.name} {e.value}%
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
