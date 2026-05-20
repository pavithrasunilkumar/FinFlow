import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: 'rgba(0, 212, 255, 0.15)',
        },
        finflow: {
          bg: '#030712',
          bg2: '#0a0f1e',
          bg3: '#0f1629',
          card: '#0d1425',
          card2: '#111827',
          border: '#1e2d4a',
          border2: '#243758',
          cyan: '#00d4ff',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)' },
          to: { boxShadow: '0 0 25px rgba(0, 212, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
