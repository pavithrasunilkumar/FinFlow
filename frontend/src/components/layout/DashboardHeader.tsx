'use client'
import { Bell, Search, ChevronDown } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  return (
    <header className="h-14 border-b border-[#1e2d4a] px-6 flex items-center justify-between sticky top-0 bg-[#030712]/95 backdrop-blur-sm z-10">
      <div>
        <h1 className="font-display font-800 text-base">{title}</h1>
        {subtitle && <p className="text-[11px] text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="w-8 h-8 rounded-lg border border-[#1e2d4a] bg-[#0d1425] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Bell size={14} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e2d4a] bg-[#0d1425] cursor-pointer hover:border-[#243758] transition-colors">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          <span className="text-xs text-gray-300">Admin</span>
          <ChevronDown size={12} className="text-gray-500" />
        </div>
      </div>
    </header>
  )
}
