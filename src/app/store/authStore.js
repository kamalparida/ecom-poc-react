import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: (() => {
    const stored = sessionStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })(),

  signIn: (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData })
  },

  signOut: () => {
    sessionStorage.removeItem('user')
    set({ user: null })
  },
}))
