'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import { useState } from 'react'

const NOTIFICATIONS = [
  { id:'n1', icon:'🚨', title:'Critical anomaly detected', desc:'TXN-4821: $12,800 vendor payment shows 340% deviation. Isolation Forest confidence: 94.2%. Immediate review required.', time:'2 min ago', severity:'critical', read:false },
  { id:'n2', icon:'🔮', title:'Q1 Forecast ready', desc:'Prophet + XGBoost ensemble has completed 90-day revenue projection. Base case: $3.2M with 89% confidence.', time:'18 min ago', severity:'info', read:false },
  { id:'n3', icon:'💡', title:'Cost optimization identified', desc:'Infrastructure spend 18% above benchmark. Reserved instance strategy saves estimated $43K annually.', time:'1 hr ago', severity:'warning', read:false },
  { id:'n4', icon:'📈', title:'Revenue milestone hit', desc:'ARR crossed $3.4M threshold. November MRR: $284K (+10.4% MoM). Congratulations!', time:'3 hr ago', severity:'positive', read:true },
  { id:'n5', icon:'🛡️', title:'Duplicate invoice blocked', desc:'AI Agent detected INV-DUP-092 as duplicate of INV-089. $3,200 payment held pending review.', time:'Yesterday', severity:'warning', read:true },
  { id:'n6', icon:'📊', title:'Monthly report generated', desc:'November Executive Summary (8 pages) is ready. Includes board-ready financials and AI recommendations.', time:'Yesterday', severity:'info', read:true },
]

const sev = {
  critical:'bg-red-400/10 border-red-400/20',
  warning:'bg-amber-400/10 border-amber-400/20',
  info:'bg-cyan-400/10 border-cyan-400/20',
  positive:'bg-emerald-400/10 border-emerald-400/20',
}

export default function NotificationsPage() {
  const [notes, setNotes] = useState(NOTIFICATIONS)
  const unread = notes.filter(n => !n.read).length

  const markRead = (id: string) => setNotes(prev => prev.map(n => n.id===id ? {...n,read:true} : n))
  const markAllRead = () => setNotes(prev => prev.map(n => ({...n,read:true})))

  return (
    <div>
      <DashboardHeader title="Notifications" subtitle={`${unread} unread alerts`} actions={
        <button onClick={markAllRead} className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-gray-400 hover:text-white transition-colors">Mark all read</button>
      }/>
      <div className="p-6 max-w-3xl">
        <div className="flex flex-col gap-3">
          {notes.map(n => (
            <div key={n.id} onClick={() => markRead(n.id)}
              className={`glass-card p-4 flex gap-3 cursor-pointer hover:border-[#243758] transition-all ${!n.read ? 'border-l-2 border-l-cyan-400' : ''}`}>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base flex-shrink-0 ${sev[n.severity as keyof typeof sev]}`}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-600 mb-0.5 ${n.read ? 'text-gray-400' : 'text-white'}`}>{n.title}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed">{n.desc}</div>
              </div>
              <div className="text-[10px] text-gray-600 font-mono flex-shrink-0 whitespace-nowrap">{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
