'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import { useState } from 'react'

const SECTIONS = [
  { label:'Profile', icon:'👤' },
  { label:'AI Models', icon:'🧠' },
  { label:'Integrations', icon:'🔌' },
  { label:'Notifications', icon:'🔔' },
  { label:'Security', icon:'🛡️' },
  { label:'Billing', icon:'💳' },
]

export default function SettingsPage() {
  const [active, setActive] = useState('Profile')
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434')
  const [model, setModel] = useState('llama3')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000) }

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Platform configuration and preferences"/>
      <div className="p-6 flex gap-4">
        <div className="w-48 flex-shrink-0">
          <div className="flex flex-col gap-1">
            {SECTIONS.map(s => (
              <button key={s.label} onClick={() => setActive(s.label)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${active===s.label?'bg-cyan-400/10 text-cyan-400':'text-gray-400 hover:bg-white/4 hover:text-white'}`}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 max-w-xl">
          {active==='Profile' && (
            <div className="glass-card p-5 flex flex-col gap-4">
              <h3 className="font-display font-700 text-sm border-b border-[#1e2d4a] pb-3">Profile Settings</h3>
              {[['Full Name','Alex Johnson'],['Email','alex@company.com'],['Organization','FinFlow Demo Corp'],['Role','CFO / Finance Lead']].map(([l,v]) => (
                <div key={l}>
                  <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">{l.toUpperCase()}</label>
                  <input defaultValue={v} className="w-full bg-[#0d1425] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50 transition-colors"/>
                </div>
              ))}
              <button onClick={save} className="self-start text-xs px-4 py-2 rounded-lg bg-cyan-400 text-black font-600">
                {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          )}
          {active==='AI Models' && (
            <div className="glass-card p-5 flex flex-col gap-4">
              <h3 className="font-display font-700 text-sm border-b border-[#1e2d4a] pb-3">AI Model Configuration</h3>
              <div>
                <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">PRIMARY LLM MODEL</label>
                <select value={model} onChange={e=>setModel(e.target.value)} className="w-full bg-[#0d1425] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option value="llama3">Llama 3 (Local via Ollama)</option>
                  <option value="mistral">Mistral 7B (Local via Ollama)</option>
                  <option value="openrouter">OpenRouter Free Tier</option>
                  <option value="static">Static Intelligent Fallback</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">OLLAMA BASE URL</label>
                <input value={ollamaUrl} onChange={e=>setOllamaUrl(e.target.value)} className="w-full bg-[#0d1425] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"/>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">OPENROUTER API KEY (OPTIONAL — FREE TIER)</label>
                <input type="password" placeholder="sk-or-..." className="w-full bg-[#0d1425] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"/>
              </div>
              <div className="text-[11px] text-gray-500 p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
                ℹ️ FinFlow AI uses a free LLM fallback chain: Ollama (local) → OpenRouter free tier → intelligent static responses. No paid API keys required.
              </div>
              <button onClick={save} className="self-start text-xs px-4 py-2 rounded-lg bg-cyan-400 text-black font-600">{saved?'✓ Saved!':'Save Configuration'}</button>
            </div>
          )}
          {['Integrations','Notifications','Security','Billing'].includes(active) && (
            <div className="glass-card p-12 text-center">
              <div className="text-4xl mb-3">⚙️</div>
              <div className="font-display font-700 text-sm mb-2">{active} Settings</div>
              <div className="text-xs text-gray-400">Configure {active.toLowerCase()} settings for your FinFlow AI account.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
