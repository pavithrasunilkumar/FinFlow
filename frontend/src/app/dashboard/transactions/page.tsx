'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const TRANSACTIONS = [
  { id:'TXN-001', date:'Nov 28', desc:'Stripe Revenue — SaaS Subscriptions', type:'income', amount:48240, category:'Revenue', risk:'low', status:'Cleared' },
  { id:'TXN-002', date:'Nov 27', desc:'AWS Infrastructure — Compute', type:'expense', amount:-8420, category:'Infrastructure', risk:'low', status:'Cleared' },
  { id:'TXN-4821', date:'Nov 26', desc:'Vendor TXN-4821 — Office Supplies', type:'expense', amount:-12800, category:'Operations', risk:'high', status:'⚠ Review' },
  { id:'TXN-003', date:'Nov 25', desc:'Payroll — Engineering Team', type:'expense', amount:-42000, category:'Payroll', risk:'low', status:'Cleared' },
  { id:'TXN-004', date:'Nov 24', desc:'Client Invoice #INV-0218', type:'income', amount:15000, category:'Services', risk:'low', status:'Cleared' },
  { id:'TXN-005', date:'Nov 23', desc:'Google Workspace — Annual', type:'expense', amount:-2400, category:'SaaS', risk:'low', status:'Cleared' },
  { id:'TXN-006', date:'Nov 22', desc:'Meta Ads — Q4 Campaign', type:'expense', amount:-18500, category:'Marketing', risk:'medium', status:'Cleared' },
  { id:'TXN-007', date:'Nov 21', desc:'Revenue — Enterprise License', type:'income', amount:82000, category:'Licensing', risk:'low', status:'Cleared' },
  { id:'TXN-008', date:'Nov 20', desc:'Bank Transfer — Reserve Fund', type:'transfer', amount:50000, category:'Treasury', risk:'low', status:'Cleared' },
  { id:'INV-DUP-092', date:'Nov 19', desc:'Duplicate charge flagged by AI', type:'expense', amount:-3200, category:'Operations', risk:'high', status:'🛑 Held' },
]

const typeStyles = { income: 'bg-emerald-400/10 text-emerald-400', expense: 'bg-red-400/10 text-red-400', transfer: 'bg-cyan-400/10 text-cyan-400' }
const riskStyles = { low: 'bg-emerald-400/8 text-emerald-400', medium: 'bg-amber-400/8 text-amber-400', high: 'bg-red-400/8 text-red-400' }

export default function TransactionsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter || t.risk === filter)

  return (
    <div>
      <DashboardHeader title="Transaction Intelligence" subtitle="AI-enriched transaction log with anomaly scoring" actions={
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] bg-[#0d1425] text-gray-300 outline-none">
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
            <option value="high">High Risk Only</option>
          </select>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-[#1e2d4a] text-gray-400 hover:text-white transition-colors">Export CSV</button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-600">+ Import</button>
        </div>
      } />
      <div className="p-6">
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2d4a]">
                {['DATE','DESCRIPTION','TYPE','AMOUNT','CATEGORY','RISK SCORE','STATUS'].map(h => (
                  <th key={h} className="text-left text-[10px] text-gray-500 tracking-widest px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="border-b border-[#1e2d4a]/50 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-gray-500 font-mono">{tx.date}</td>
                  <td className="px-4 py-3 text-xs font-600 text-white max-w-xs truncate">{tx.desc}</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-[10px] font-mono px-2 py-0.5 rounded', typeStyles[tx.type as keyof typeof typeStyles])}>{tx.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs font-mono font-600', tx.amount > 0 ? 'text-emerald-400' : 'text-red-400')}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{tx.category}</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded', riskStyles[tx.risk as keyof typeof riskStyles])}>{tx.risk.toUpperCase()}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-gray-400">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
