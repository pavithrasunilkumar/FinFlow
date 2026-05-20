'use client'
import { useState } from 'react'
import DashboardHeader from '@/components/layout/DashboardHeader'
import ChartCard from '@/components/dashboard/ChartCard'
import KPICard from '@/components/dashboard/KPICard'
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, ReferenceLine
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const historicalRev = [185,212,198,235,260,248,275,292,268,305,288,318]

function buildForecastData(type: string) {
  const hist = type === 'revenue' ? [185,212,198,235,260,248,275,292,268,305,288,318]
    : type === 'expense' ? [142,165,154,178,195,188,208,220,203,228,215,236]
    : [43,47,44,57,65,60,67,72,65,77,73,82]
  const g = type === 'revenue' ? 1.042 : type === 'expense' ? 1.018 : 1.055
  const last = hist[hist.length - 1]
  const proj = [1,2,3].map(i => Math.round(last * Math.pow(g, i)))
  const upper = proj.map(v => Math.round(v * 1.08))
  const lower = proj.map(v => Math.round(v * 0.93))
  const labels = [...MONTHS, 'Jan', 'Feb', 'Mar']
  return labels.map((month, i) => ({
    month,
    historical: i < 12 ? hist[i] : null,
    forecast: i >= 11 ? (i === 11 ? hist[11] : proj[i - 12]) : null,
    upper: i >= 11 ? (i === 11 ? hist[11] : upper[i - 12]) : null,
    lower: i >= 11 ? (i === 11 ? hist[11] : lower[i - 12]) : null,
  }))
}

const anomalyData = MONTHS.map((m, i) => ({
  x: i, y: historicalRev[i],
  z: (i === 2 || i === 5 || i === 9) ? 40 : 15,
  anomaly: i === 2 || i === 5 || i === 9
}))

export default function ForecastingPage() {
  const [forecastType, setForecastType] = useState('revenue')
  const data = buildForecastData(forecastType)
  const colors = { revenue: '#00d4ff', expense: '#ef4444', cashflow: '#10b981' }
  const color = colors[forecastType as keyof typeof colors]

  return (
    <div>
      <DashboardHeader title="Predictive Analytics Engine" subtitle="Prophet + XGBoost ensemble forecasting" actions={
        <div className="flex gap-2">
          <select value={forecastType} onChange={e => setForecastType(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] bg-[#0d1425] text-gray-300 outline-none">
            <option value="revenue">Revenue Forecast</option>
            <option value="expense">Expense Forecast</option>
            <option value="cashflow">Cash Flow Forecast</option>
          </select>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600">Run Forecast</button>
        </div>
      } />
      <div className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3">
          <KPICard label="Forecast Accuracy" value="94.7%" valueColor="text-cyan-400" change={0.023} changeLabel="improvement" />
          <KPICard label="Confidence Interval" value="89%" valueColor="text-white" />
          <KPICard label="Projected Q1 Revenue" value="$3.2M" valueColor="text-emerald-400" change={0.127} changeLabel="vs Q4" />
          <KPICard label="Cash Runway" value="18.4mo" valueColor="text-white" />
        </div>

        <ChartCard title={`${forecastType.charAt(0).toUpperCase() + forecastType.slice(1)} Forecast — 90 Day Projection`} badge="PROPHET + XGBOOST">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
              <XAxis dataKey="month" tick={{ fill: '#4a6080', fontSize: 10 }} />
              <YAxis tick={{ fill: '#4a6080', fontSize: 10 }} tickFormatter={v => '$'+v+'K'} />
              <Tooltip contentStyle={{ background: '#0d1425', border: '1px solid #1e2d4a', borderRadius: 8 }} />
              <ReferenceLine x="Dec" stroke="#1e2d4a" strokeDasharray="4 4" label={{ value: 'Forecast', fill: '#4a6080', fontSize: 10 }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill={color} fillOpacity={0.12} />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#030712" fillOpacity={1} />
              <Line type="monotone" dataKey="historical" stroke={color} strokeWidth={2} dot={false} name="Historical" connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke={color} strokeWidth={2} strokeDasharray="6 3" dot={{ fill: '#000', stroke: color, r: 3 }} name="Forecast" connectNulls={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-3 gap-4">
          <ChartCard title="Scenario Analysis">
            <div className="flex flex-col gap-2 mt-1">
              {[
                { label: 'BULL CASE (+22%)', value: '$3.89M', prob: '28%', color: '#10b981' },
                { label: 'BASE CASE (+12.7%)', value: '$3.20M', prob: '54%', color: '#00d4ff' },
                { label: 'BEAR CASE (+3%)', value: '$2.93M', prob: '18%', color: '#ef4444' },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg border" style={{ background: s.color + '08', borderColor: s.color + '25' }}>
                  <div className="text-[10px] font-mono mb-1" style={{ color: s.color }}>{s.label}</div>
                  <div className="font-display text-xl font-800">{s.value}</div>
                  <div className="text-[10px] text-gray-500">Probability: {s.prob}</div>
                </div>
              ))}
            </div>
          </ChartCard>
          <div className="col-span-2">
            <ChartCard title="Anomaly Detection Timeline" badge="ISOLATION FOREST">
              <ResponsiveContainer width="100%" height={180}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                  <XAxis type="number" dataKey="x" domain={[0,11]} tickFormatter={i => MONTHS[i]} tick={{ fill: '#4a6080', fontSize: 10 }} />
                  <YAxis type="number" dataKey="y" tick={{ fill: '#4a6080', fontSize: 10 }} tickFormatter={v => '$'+v+'K'} />
                  <ZAxis type="number" dataKey="z" range={[30,200]} />
                  <Tooltip contentStyle={{ background: '#0d1425', border: '1px solid #1e2d4a', borderRadius: 8 }} formatter={(v,n) => [n==='y' ? '$'+v+'K' : v, n==='y' ? 'Amount' : 'Risk']} />
                  <Scatter data={anomalyData.filter(d => !d.anomaly)} fill="#3b82f644" stroke="#3b82f6" strokeWidth={1} />
                  <Scatter data={anomalyData.filter(d => d.anomaly)} fill="#ef444444" stroke="#ef4444" strokeWidth={2} name="Anomaly" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  )
}
