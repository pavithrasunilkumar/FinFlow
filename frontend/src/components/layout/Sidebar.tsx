'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, BarChart3, ArrowLeftRight, Brain, Bot,
  TrendingUp, FileText, FlaskConical, Bell, Settings, ChevronLeft, Zap
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard, section: 'OVERVIEW' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/dashboard/insights', label: 'AI Insights', icon: Brain, section: 'INTELLIGENCE' },
  { href: '/dashboard/agents', label: 'AI Agents', icon: Bot },
  { href: '/dashboard/forecasting', label: 'Forecasting', icon: TrendingUp },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText, section: 'TOOLS' },
  { href: '/dashboard/lab', label: 'Data Lab', icon: FlaskConical },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/chat', label: 'AI Assistant', icon: Bot, section: 'AI' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-52 min-h-screen bg-[#0a0f1e] border-r border-[#1e2d4a] flex flex-col">
      <div className="p-4 border-b border-[#1e2d4a]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          <div>
            <div className="font-display font-800 text-sm gradient-cyan">FinFlow AI</div>
            <div className="text-[9px] text-gray-500 tracking-widest">ENTERPRISE</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <div key={item.href}>
              {item.section && (
                <div className="text-[9px] text-gray-500 tracking-widest px-3 pt-4 pb-1">{item.section}</div>
              )}
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all',
                  active
                    ? 'bg-cyan-400/10 text-cyan-400 border-r-2 border-cyan-400'
                    : 'text-gray-400 hover:bg-white/4 hover:text-white'
                )}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className="p-3 border-t border-[#1e2d4a]">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
          <div className="status-dot" />
          <span className="text-[10px] text-emerald-400 font-mono">AI SYSTEMS ONLINE</span>
        </div>
      </div>
    </aside>
  )
}
