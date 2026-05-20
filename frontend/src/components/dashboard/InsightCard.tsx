'use client'
import { cn } from '@/lib/utils'

interface Insight {
  icon: string
  title: string
  description: string
  time?: string
  severity?: 'positive' | 'warning' | 'critical' | 'info'
}

interface InsightCardProps {
  insights: Insight[]
  title?: string
  badge?: string
}

const severityStyles = {
  positive: 'bg-emerald-400/10 border-emerald-400/20',
  warning: 'bg-amber-400/10 border-amber-400/20',
  critical: 'bg-red-400/10 border-red-400/20',
  info: 'bg-cyan-400/10 border-cyan-400/20',
}

export default function InsightCard({ insights, title = 'AI Insights', badge }: InsightCardProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-700 text-sm">{title}</h3>
        {badge && <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{badge}</span>}
      </div>
      <div className="flex flex-col divide-y divide-[#1e2d4a]">
        {insights.map((ins, i) => (
          <div key={i} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center text-sm flex-shrink-0', severityStyles[ins.severity || 'info'])}>
              {ins.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-600 mb-0.5">{ins.title}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{ins.description}</div>
            </div>
            {ins.time && <div className="text-[10px] text-gray-600 font-mono flex-shrink-0">{ins.time}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
