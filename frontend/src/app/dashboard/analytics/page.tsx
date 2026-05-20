'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import ChartCard from '@/components/dashboard/ChartCard'
import KPICard from '@/components/dashboard/KPICard'
import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const revenueData = MONTHS.map((m, i) => ({
  month: m,
  revenue: [185,212,198,235,260,248,275,292,268,305,288,318][i],
  expenses: [142,165,154,178,195,188,208,220,203,228,215,236][i],
  profit: [43,47,44,57,65,60,67,72,65,77,73,82][i],
  target: [180,200,210,220,240,240,260,270,270,290,280,310][i],
}))

const cohortData = [
  { month:'Jan',mrr:210,churned:4.2,new:24,expanded:8},
  { month:'Feb',mrr:226,churned:3.8,new:22,expanded:12},
  { month:'Mar',mrr:240,churned:3.1,new:28,expanded:9},
  { month:'Apr',mrr:261,churned:2.9,new:31,expanded:11},
  { month:'May',mrr:278,churned:2.4,new:26,expanded:14},
  { month:'Jun',mrr:284,churned:1.8,new:20,expanded:16},
]

const radarData = [
  { subject:'Revenue Growth',A:87},{ subject:'Margin',A:72},{ subject:'Retention',A:91},
  { subject:'Efficiency',A:84},{ subject:'Cash Flow',A:78},{ subject:'Pipeline',A:68},
]

const PERIODS = ['1M','3M','6M','12M','YTD']

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('12M')
  const [metric, setMetric] = useState('revenue')

  const colors: Record<string, string> = { revenue:'#00d4ff', expenses:'#ef4444', profit:'#10b981' }

  return (
    <div>
      <DashboardHeader
        title="Advanced Analytics"
        subtitle="Enterprise BI · Real-time financial intelligence"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-[#1e2d4a] overflow-hidden">
              {PERIODS.map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-[10px] px-2.5 py-1.5 transition-colors ${period===p ? 'bg-cyan-400 text-black font-700' : 'text-gray-400 hover:text-white'}`}>{p}</button>
              ))}
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-gray-400 hover:text-white transition-colors">Export</button>
          </div>
        }
      />
      <div className="p-6 flex flex-col gap-4">
        {/* KPIs */}
        <div className="grid grid-cols-5 gap-3">
          <KPICard label="ARR" value="$3.41M" change={0.184} sparkData={[210,226,240,261,278,284,275,292,268,305,288,318]} />
          <KPICard label="MRR" value="$284K" change={0.096} sparkData={[185,212,198,235,260,248,275,292,268,305,288,318]} />
          <KPICard label="Gross Margin" value="72.3%" valueColor="text-emerald-400" change={0.021} />
          <KPICard label="NRR" value="118%" valueColor="text-cyan-400" change={0.034} />
          <KPICard label="CAC Payback" value="4.2mo" valueColor="text-white" change={-0.12} changeLabel="improvement" />
        </div>

        {/* Main chart */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ChartCard title="Revenue Performance vs Target" badge="12M TREND">
              <div className="flex gap-3 mb-3">
                {['revenue','expenses','profit'].map(m => (
                  <button key={m} onClick={() => setMetric(m)}
                    className={`text-[10px] px-2.5 py-1 rounded transition-all capitalize ${metric===m ? 'text-black font-700' : 'text-gray-500 hover:text-gray-300'}`}
                    style={metric===m ? { background: colors[m] } : {}}>
                    {m}
                  </button>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    {Object.entries(colors).map(([k,c]) => (
                      <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={c} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
                  <XAxis dataKey="month" tick={{fill:'#4a6080',fontSize:10}}/>
                  <YAxis tick={{fill:'#4a6080',fontSize:10}} tickFormatter={v=>'$'+v+'K'}/>
                  <Tooltip contentStyle={{background:'#0d1425',border:'1px solid #1e2d4a',borderRadius:8}}/>
                  <Area type="monotone" dataKey={metric} stroke={colors[metric]} fill={`url(#grad-${metric})`} strokeWidth={2} dot={false}/>
                  <Line type="monotone" dataKey="target" stroke="#4a6080" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Target"/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          <ChartCard title="Business Health Radar" badge="MULTI-DIMENSION">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2d4a"/>
                <PolarAngleAxis dataKey="subject" tick={{fill:'#4a6080',fontSize:9}}/>
                <Radar name="Score" dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.12} strokeWidth={2}/>
                <Tooltip contentStyle={{background:'#0d1425',border:'1px solid #1e2d4a',borderRadius:8}}/>
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* MRR Cohort + Bar */}
        <div className="grid grid-cols-2 gap-4">
          <ChartCard title="MRR Movement — Monthly Cohort" badge="SAAS METRICS">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
                <XAxis dataKey="month" tick={{fill:'#4a6080',fontSize:10}}/>
                <YAxis tick={{fill:'#4a6080',fontSize:10}}/>
                <Tooltip contentStyle={{background:'#0d1425',border:'1px solid #1e2d4a',borderRadius:8}}/>
                <Legend wrapperStyle={{fontSize:10,color:'#4a6080'}}/>
                <Bar dataKey="new" stackId="a" fill="#10b981" fillOpacity={0.8} name="New MRR" radius={[0,0,0,0]}/>
                <Bar dataKey="expanded" stackId="a" fill="#00d4ff" fillOpacity={0.8} name="Expansion"/>
                <Bar dataKey="churned" stackId="a" fill="#ef4444" fillOpacity={0.7} name="Churned" radius={[2,2,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue by Category — Q4" badge="BREAKDOWN">
            <div className="flex flex-col gap-2 mt-2">
              {[
                {cat:'SaaS Subscriptions', val:159000, pct:50, color:'#00d4ff'},
                {cat:'Professional Services', val:76320, pct:24, color:'#3b82f6'},
                {cat:'Consulting Retainers', val:50880, pct:16, color:'#8b5cf6'},
                {cat:'Licensing & API', val:31800, pct:10, color:'#10b981'},
              ].map(r => (
                <div key={r.cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{r.cat}</span>
                    <span className="font-mono text-white">${(r.val/1000).toFixed(0)}K <span className="text-gray-600">({r.pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{width:r.pct+'%',background:r.color}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#1e2d4a] flex justify-between text-xs">
              <span className="text-gray-500">Total Q4 Revenue</span>
              <span className="font-mono font-700 text-white">$318,000</span>
            </div>
          </ChartCard>
        </div>

        {/* Unit economics table */}
        <ChartCard title="Unit Economics — SaaS Benchmarks" badge="ENTERPRISE">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2d4a]">
                {['METRIC','YOUR COMPANY','INDUSTRY MEDIAN','TOP QUARTILE','STATUS'].map(h => (
                  <th key={h} className="text-left text-[10px] text-gray-500 tracking-widest py-2 pr-4 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Gross Margin','72.3%','68%','75%','good'],
                ['CAC Payback Period','4.2 months','8.3 months','5.0 months','great'],
                ['NRR (Net Revenue Retention)','118%','108%','120%','good'],
                ['LTV:CAC Ratio','8.3x','3.1x','7.0x','great'],
                ['Monthly Churn Rate','1.8%','3.2%','1.5%','good'],
                ['Magic Number','0.84','0.75','1.0+','watch'],
              ].map(([m,y,med,top,s]) => (
                <tr key={m as string} className="border-b border-[#1e2d4a]/50 hover:bg-white/1">
                  <td className="py-2.5 pr-4 text-xs text-gray-300">{m}</td>
                  <td className="py-2.5 pr-4 text-xs font-mono font-600 text-white">{y}</td>
                  <td className="py-2.5 pr-4 text-xs font-mono text-gray-500">{med}</td>
                  <td className="py-2.5 pr-4 text-xs font-mono text-gray-400">{top}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${s==='great'?'bg-emerald-400/10 text-emerald-400':s==='good'?'bg-cyan-400/10 text-cyan-400':'bg-amber-400/10 text-amber-400'}`}>
                      {s==='great'?'ABOVE QUARTILE':s==='good'?'ON TRACK':'MONITOR'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </div>
    </div>
  )
}
