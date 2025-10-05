import { create } from 'zustand'
import { fetchProgress } from '../utils/apiClient'
import { useAppStore } from './useAppStore'

export const useAuthStore = create((set, get) => ({
  token: null,
  email: '',
  apiBase: import.meta.env.VITE_API_BASE || 'https://yourdomain.profreehost.com/server/api',

  setApiBase: (url) => set({ apiBase: url }),

  isLoggedIn: () => Boolean(get().token),

  login: async (email, password) => {
    const res = await fetch(`${get().apiBase}/auth.php?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    set({ token: data.token, email })
    // Load server progress and apply
    try {
      const serverData = await fetchProgress()
      if (serverData && typeof serverData === 'object') {
        const { milestones, userSettings } = serverData
        if (milestones || userSettings) {
          useAppStore.getState().importData(JSON.stringify({ milestones, userSettings }))
        }
      }
    } catch (_) {}
    return true
  },

  register: async (email, password) => {
    const res = await fetch(`${get().apiBase}/auth.php?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Register failed')
    return true
  },

  logout: () => set({ token: null, email: '' }),
}))


