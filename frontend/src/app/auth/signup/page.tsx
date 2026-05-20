'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 50% 50% at 50% -10%,rgba(0,212,255,0.08),transparent)'}}/>
      <div className="glass-card p-8 w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Zap size={18} className="text-black"/>
          </div>
          <div className="font-display font-800 text-xl gradient-cyan mb-1">FinFlow AI</div>
          <div className="text-sm text-gray-400">Create your free account</div>
        </div>
        <div className="flex flex-col gap-3">
          {[['Full Name','Alex Johnson'],['Work Email','alex@company.com'],['Company','Acme Corp']].map(([l,p]) => (
            <div key={l}>
              <label className="text-[10px] text-gray-500 tracking-widest mb-1 block">{l.toUpperCase()}</label>
              <input placeholder={p} className="w-full bg-[#0a0f1e] border border-[#1e2d4a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition-colors"/>
            </div>
          ))}
          <button onClick={()=>router.push('/dashboard/overview')}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-700 rounded-lg text-sm hover:opacity-90 mt-2">
            Create Account
          </button>
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          Already have an account?{' '}<Link href="/auth/login" className="text-cyan-400">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
