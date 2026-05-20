import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  full_name: string
  role: string
  avatar_url?: string
}

interface AppStore {
  user: User | null
  token: string | null
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
  logout: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      sidebarOpen: true,
      theme: 'dark',
      setUser: (user) => set({ user }),
      setToken: (token) => {
        set({ token })
        if (typeof window !== 'undefined') {
          if (token) localStorage.setItem('finflow_token', token)
          else localStorage.removeItem('finflow_token')
        }
      },
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'finflow-app-store', partialize: (state) => ({ user: state.user, token: state.token, theme: state.theme }) }
  )
)
