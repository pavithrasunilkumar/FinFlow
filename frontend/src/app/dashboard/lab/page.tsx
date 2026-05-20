'use client'
import { useState, useCallback } from 'react'
import DashboardHeader from '@/components/layout/DashboardHeader'
import ChartCard from '@/components/dashboard/ChartCard'
import KPICard from '@/components/dashboard/KPICard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const distData = [
  { range: '<$1K', count: 420 }, { range: '$1-5K', count: 310 }, { range: '$5-10K', count: 180 },
  { range: '$10-25K', count: 92 }, { range: '$25-50K', count: 48 }, { range: '$50K+', count: 14 },
]

const corrFeatures = ['Revenue','Expenses','Marketing','Cash Flow','CAC']
const corrMatrix = [
  [1.00,0.72,0.87,0.64,0.31],[0.72,1.00,0.58,0.41,0.19],[0.87,0.58,1.00,0.52,0.44],
  [0.64,0.41,0.52,1.00,0.28],[0.31,0.19,0.44,0.28,1.00]
]

export default function DataLabPage() {
  const [loaded, setLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)

  const loadSample = () => setLoaded(true)

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    setLoaded(true)
  }, [])

  return (
    <div>
      <DashboardHeader title="Data Intelligence Lab" subtitle="Upload datasets · Automatic EDA · AI-generated insights" />
      <div className="p-6 flex flex-col gap-4">
        {!loaded ? (
          <div
            onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)}
            className={`glass-card p-16 text-center border-2 border-dashed transition-all ${dragging ? 'border-cyan-400 bg-cyan-400/5' : 'border-[#243758]'}`}>
            <div className="text-5xl mb-4">🔬</div>
            <div className="font-display font-700 text-lg mb-2">Drop CSV Dataset Here</div>
            <div className="text-sm text-gray-400 mb-6">Drag & drop or click to upload · CSV, Excel, JSON · Max 50MB</div>
            <div className="flex gap-3 justify-center">
              <button onClick={loadSample} className="text-sm px-6 py-2.5 rounded-lg bg-cyan-400 text-black font-600 hover:opacity-90 transition-opacity">
                Load Sample Financial Dataset
              </button>
              <button className="text-sm px-6 py-2.5 rounded-lg border border-[#243758] text-gray-300 hover:border-cyan-400/50 transition-colors">
                Upload CSV
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-3">
              <KPICard label="Rows" value="1,240" valueColor="text-white" />
              <KPICard label="Columns" value="8" valueColor="text-white" />
              <KPICard label="Missing Values" value="0.2%" valueColor="text-emerald-400" changeLabel="Excellent quality" />
              <KPICard label="Outliers" value="47" valueColor="text-amber-400" changeLabel="3.8% of dataset" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ChartCard title="Distribution Analysis" badge="EDA">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={distData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                    <XAxis dataKey="range" tick={{ fill: '#4a6080', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#4a6080', fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#0d1425', border: '1px solid #1e2d4a', borderRadius: 8 }} />
                    <Bar dataKey="count" fill="#3b82f6" fillOpacity={0.8} radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Correlation Heatmap" badge="FEATURE ANALYSIS">
                <div className="mt-2" style={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', gap: 2, fontSize: 10 }}>
                  <div />
                  {corrFeatures.map(f => <div key={f} className="text-center text-gray-500 text-[9px] truncate">{f}</div>)}
                  {corrFeatures.map((row, r) => (
                    <>
                      <div key={'row'+r} className="text-right text-gray-500 text-[9px] self-center pr-1">{row}</div>
                      {corrMatrix[r].map((val, c) => (
                        <div key={c} className="h-8 flex items-center justify-center rounded text-[9px] font-mono"
                          style={{ background: val > 0 ? `rgba(0,212,255,${val*0.8})` : `rgba(239,68,68,${Math.abs(val)*0.8})`, color: '#fff' }}>
                          {val.toFixed(2)}
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </ChartCard>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-700 text-sm">🤖 AI Dataset Analysis</h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">AUTO-GENERATED</span>
              </div>
              <div className="text-[12px] text-gray-300 leading-7">
                <span className="text-cyan-400 font-600">Dataset Overview: </span>
                1,240 financial transactions spanning 12 months with 8 features. Data quality score: <span className="text-emerald-400">94/100</span>.<br/>
                <span className="text-cyan-400 font-600">Key Findings: </span>
                Revenue distribution shows right skew (skewness: 2.34). Strong positive correlation (r=0.87) between marketing_spend and revenue_next_month suggests 30-day lag effect. Seasonal pattern: Q4 shows 34% higher transaction volume vs Q1-Q3 average.<br/>
                <span className="text-cyan-400 font-600">Anomalies: </span>
                47 outliers detected via IQR method (3.8% of dataset). 12 transactions exceed 3σ threshold — recommend manual review.<br/>
                <span className="text-cyan-400 font-600">Recommendation: </span>
                Dataset suitable for time-series forecasting. Feature engineering with rolling 30-day averages and lag features will improve model accuracy by estimated 8-12%.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
