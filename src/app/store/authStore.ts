import { create } from 'zustand'
import type { AuthUser } from '../../types'

const USER_KEY = 'user'

type AuthState = {
  user: AuthUser | null
  signIn: (userData: AuthUser, remember?: boolean) => void
  signOut: () => void
}

function readStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    return null
  }
}

function clearStoredUser() {
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(USER_KEY)
}

export const useAuthStore = create<AuthState>((set) => ({
  user: readStoredUser(),

  signIn: (userData, remember = false) => {
    clearStoredUser()
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(USER_KEY, JSON.stringify(userData))
    set({ user: userData })
  },

  signOut: () => {
    clearStoredUser()
    set({ user: null })
  },
}))
