import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinFlow AI — Your Autonomous AI CFO',
  description: 'Enterprise AI-powered financial intelligence operating system. Predict trends, analyze finances, automate insights.',
  keywords: ['AI CFO', 'financial intelligence', 'fintech', 'forecasting', 'anomaly detection'],
  openGraph: {
    title: 'FinFlow AI — Your Autonomous AI CFO',
    description: 'Enterprise AI-powered financial intelligence operating system.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
