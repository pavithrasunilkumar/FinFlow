'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Zap, Brain, TrendingUp, Shield, Bot, FlaskConical, ChevronRight, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'Generative Finance AI', desc: 'Conversational CFO that analyzes your data, explains anomalies, and generates executive-grade reports on demand.' },
  { icon: TrendingUp, title: 'Predictive Forecasting', desc: 'Prophet + XGBoost ensemble models deliver 90-day revenue and cash flow forecasts with confidence intervals.' },
  { icon: Shield, title: 'Anomaly Detection', desc: 'Isolation Forest algorithms surface suspicious transactions and operational outliers with real-time risk scoring.' },
  { icon: Bot, title: 'Autonomous AI Agents', desc: '6 specialized agents run independently — forecast, expense analysis, budget optimization, fraud detection.' },
  { icon: FlaskConical, title: 'Data Intelligence Lab', desc: 'Upload CSV datasets, run automatic EDA, correlation heatmaps, outlier detection, and AI-generated insights.' },
  { icon: Zap, title: 'Real-Time Analytics', desc: 'Live KPI tracking, financial health scoring, and trend detection across all your business dimensions.' },
]

const PRICING = [
  { name: 'Starter', price: '$0', period: '/mo', desc: 'For freelancers exploring AI finance.', features: ['5 AI insights/month', 'Revenue forecasting', 'Basic anomaly detection', '1 AI agent', 'CSV export'], featured: false },
  { name: 'Pro', price: '$49', period: '/mo', desc: 'For growing businesses demanding enterprise-grade financial intelligence.', features: ['Unlimited AI insights', 'Full forecasting suite', 'Advanced anomaly detection', 'All 6 AI agents', 'Data Intelligence Lab', 'PDF/CSV export'], featured: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For finance teams requiring custom deployments and compliance.', features: ['Everything in Pro', 'Custom AI model training', 'SOC 2 compliance', 'Dedicated instance', 'SLA guarantee', 'Priority support'], featured: false },
]

const TESTIMONIALS = [
  { quote: "FinFlow's anomaly detection caught a vendor billing error worth $47K before it hit our books. The ROI was immediate.", name: 'Sophia Ramos', role: 'CFO, Series B SaaS Company', initials: 'SR', color: '#00d4ff' },
  { quote: "90-day cash flow predictions with 92% accuracy changed how we plan hiring. Genuinely impressive AI engine.", name: 'Marcus Kim', role: 'Head of Finance, Growth Studio', initials: 'MK', color: '#10b981' },
  { quote: "Finally, a finance platform that thinks like a CFO. The AI reports alone save my team 8 hours every week.", name: 'Aisha Ibrahim', role: 'Finance Director, Scale-Up', initials: 'AI', color: '#f59e0b' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#1e2d4a] bg-[#030712]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Zap size={14} className="text-black" />
            </div>
            <div className="font-display font-800 text-base gradient-cyan">FinFlow AI</div>
          </div>
          <div className="flex items-center gap-1">
            <a href="#features" className="text-xs px-3 py-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/4">Platform</a>
            <a href="#pricing" className="text-xs px-3 py-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/4">Pricing</a>
            <div className="flex items-center gap-1.5 mx-3 text-[11px] text-gray-500 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Systems Online
            </div>
            <Link href="/dashboard/overview" className="text-xs px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-700 rounded-lg hover:opacity-90 transition-opacity">Open Dashboard →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(0,212,255,0.08), transparent), radial-gradient(ellipse 40% 30% at 80% 60%, rgba(59,130,246,0.05), transparent)' }} />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/8 text-cyan-400 text-[11px] font-mono mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-POWERED · ENTERPRISE GRADE · REAL-TIME INTELLIGENCE
          </div>
          <h1 className="font-display font-800 text-6xl leading-tight tracking-tight mb-6 gradient-text">
            Your Autonomous<br />AI CFO
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Predict trends, analyze finances, automate insights, and interact with your business using AI-powered financial intelligence.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/dashboard/overview" className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-700 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5">
              Try Demo <ArrowRight size={16} />
            </Link>
            <a href="#features" className="flex items-center gap-2 px-7 py-3 border border-[#243758] text-gray-300 rounded-xl hover:border-cyan-400/50 hover:text-white transition-all">
              Explore Platform <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-4 glass-card overflow-hidden" style={{ borderRadius: 12 }}>
          {[['$2.4B+','TRANSACTIONS ANALYZED'],['94.7%','FORECAST ACCURACY'],['12ms','ANOMALY DETECTION'],['6 AI','AUTONOMOUS AGENTS']].map(([n, l]) => (
            <div key={l} className="p-6 text-center border-r border-[#1e2d4a] last:border-r-0">
              <div className="font-display text-3xl font-800 gradient-cyan mb-1">{n}</div>
              <div className="text-[10px] text-gray-500 tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="features">
        <div className="text-[11px] text-cyan-400 tracking-widest font-mono mb-3">CAPABILITIES</div>
        <h2 className="font-display font-800 text-4xl tracking-tight mb-3">Enterprise AI Financial Intelligence</h2>
        <p className="text-gray-400 max-w-lg mb-10 leading-relaxed">Built for forward-thinking finance teams who demand more than dashboards — they demand intelligence.</p>
        <div className="grid grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-5 hover:border-[#243758] hover:-translate-y-1 transition-all">
              <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-3">
                <Icon size={16} className="text-cyan-400" />
              </div>
              <div className="font-display font-700 text-sm mb-2">{title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="pricing">
        <div className="text-[11px] text-cyan-400 tracking-widest font-mono mb-3">PRICING</div>
        <h2 className="font-display font-800 text-4xl tracking-tight mb-3">Transparent, Usage-Based Pricing</h2>
        <p className="text-gray-400 mb-10">Start free. Scale as your financial intelligence grows.</p>
        <div className="grid grid-cols-3 gap-4">
          {PRICING.map(p => (
            <div key={p.name} className={`glass-card p-6 relative ${p.featured ? 'border-cyan-400/50' : ''}`} style={p.featured ? { background: 'linear-gradient(135deg, rgba(0,212,255,0.04), rgba(59,130,246,0.04))' } : {}}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] font-700 px-4 py-1 rounded-full tracking-widest">MOST POPULAR</div>
              )}
              <div className="text-[11px] text-gray-500 tracking-widest font-mono mb-2">{p.name}</div>
              <div className="font-display text-4xl font-800 mb-1">{p.price}<span className="text-base font-400 text-gray-500">{p.period}</span></div>
              <div className="text-xs text-gray-400 mb-4 leading-relaxed">{p.desc}</div>
              <ul className="flex flex-col gap-2 mb-6">
                {p.features.map(f => <li key={f} className="flex items-center gap-2 text-xs text-gray-300"><span className="text-cyan-400 text-[10px]">✓</span>{f}</li>)}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-xs font-700 transition-all ${p.featured ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90' : 'border border-[#243758] text-gray-300 hover:border-cyan-400/50'}`}>
                {p.name === 'Starter' ? 'Get Started Free' : p.name === 'Pro' ? 'Start Pro Trial' : 'Contact Sales'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-[11px] text-cyan-400 tracking-widest font-mono mb-3">TESTIMONIALS</div>
        <h2 className="font-display font-800 text-4xl tracking-tight mb-10">Trusted by Finance Leaders</h2>
        <div className="grid grid-cols-3 gap-4">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="glass-card p-5">
              <div className="text-xs text-gray-300 leading-7 italic mb-4">"{t.quote}"</div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-700" style={{ background: t.color + '20', color: t.color }}>{t.initials}</div>
                <div><div className="text-xs font-600">{t.name}</div><div className="text-[10px] text-gray-500">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="glass-card p-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(59,130,246,0.06))', borderColor: 'rgba(0,212,255,0.15)' }}>
          <h2 className="font-display font-800 text-4xl tracking-tight mb-4">Start Your AI CFO Journey</h2>
          <p className="text-gray-400 mb-8">Join finance teams using FinFlow AI to operate at the speed of intelligence.</p>
          <Link href="/dashboard/overview" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-700 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5">
            Open Live Demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2d4a] px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[11px] text-gray-600 font-mono">© 2025 FinFlow AI · Enterprise-grade AI financial intelligence</div>
          <div className="flex gap-4">
            {['Documentation','API','Status','Privacy','Terms'].map(l => <a key={l} href="#" className="text-[11px] text-gray-600 hover:text-cyan-400 transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
