'use client'
import { cn, formatCurrency, getChangeColor } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  sparkData?: number[]
  valueColor?: string
  className?: string
}

export default function KPICard({ label, value, change, changeLabel, icon, sparkData, valueColor, className }: KPICardProps) {
  const isPositive = (change ?? 0) >= 0
  const isNeutral = change === undefined

  return (
    <div className={cn('glass-card p-4 hover:border-[#243758] transition-all', className)}>
      <div className="flex items-start justify-between mb-2">
        <div className="text-[10px] text-gray-500 tracking-widest uppercase">{label}</div>
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      <div className={cn('font-display text-2xl font-800 mb-1', valueColor || 'text-white')}>{value}</div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-[11px]', getChangeColor(change))}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          <span>{Math.abs(change * 100).toFixed(1)}% {changeLabel || 'vs last quarter'}</span>
        </div>
      )}
      {sparkData && <MiniSparkline data={sparkData} positive={isPositive} />}
    </div>
  )
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 100
  const h = 32
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  const color = positive ? '#10b981' : '#ef4444'
  return (
    <svg width="100%" height="32" viewBox={`0 0 ${w} ${h}`} className="mt-2" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
