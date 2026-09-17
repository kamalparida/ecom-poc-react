import { create } from 'zustand'
import type { AuthUser } from '../../types'

type AuthState = {
  user: AuthUser | null
  signIn: (userData: AuthUser) => void
  signOut: () => void
}

function readStoredUser(): AuthUser | null {
  const stored = sessionStorage.getItem('user')
  if (!stored) return null

  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: readStoredUser(),

  signIn: (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData })
  },

  signOut: () => {
    sessionStorage.removeItem('user')
    set({ user: null })
  },
}))
