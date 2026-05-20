'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1000))
    if (email && password) {
      router.push('/dashboard/overview')
    } else {
      setError('Please enter your email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 50% 50% at 50% -10%,rgba(0,212,255,0.08),transparent)'}}/>
      <div className="glass-card p-8 w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Zap size={18} className="text-black"/>
          </div>
          <div className="font-display font-800 text-xl gradient-cyan mb-1">FinFlow AI</div>
          <div className="text-sm text-gray-400">Sign in to your AI CFO dashboard</div>
        </div>
        <form onSubmit={login} className="flex flex-col gap-4">
          {error && <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">{error}</div>}
          <div>
            <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">EMAIL</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required
              className="w-full bg-[#0a0f1e] border border-[#1e2d4a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition-colors"/>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">PASSWORD</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required
              className="w-full bg-[#0a0f1e] border border-[#1e2d4a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition-colors"/>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-700 rounded-lg text-sm hover:opacity-90 transition-all disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4 text-xs text-gray-500">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300">Sign up free</Link>
        </div>
        <div className="mt-4 pt-4 border-t border-[#1e2d4a] text-center">
          <button onClick={() => router.push('/dashboard/overview')}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            → Enter demo (no login required)
          </button>
        </div>
      </div>
    </div>
  )
}
