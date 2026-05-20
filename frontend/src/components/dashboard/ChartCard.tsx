'use client'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  badge?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export default function ChartCard({ title, badge, children, className, actions }: ChartCardProps) {
  return (
    <div className={cn('glass-card p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-700 text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          {actions}
          {badge && (
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{badge}</span>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
