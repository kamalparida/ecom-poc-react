import type { AuthUser, LoginPayload, RegisterPayload } from '../types'

const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_BASE ?? '/api'

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return {}

  try {
    return JSON.parse(text) as unknown
  } catch {
    return { message: text }
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function errorMessage(data: unknown, fallback: string): string {
  const record = asRecord(data)
  return (
    asString(record?.message) ??
    asString(record?.error) ??
    asString(record?.msg) ??
    fallback
  )
}

function pickUserRecord(data: unknown): Record<string, unknown> {
  const root = asRecord(data) ?? {}
  return asRecord(root.user) ?? asRecord(asRecord(root.data)?.user) ?? asRecord(root.data) ?? root
}

export function toAuthUser(data: unknown, fallbackUsername: string): AuthUser {
  const source = pickUserRecord(data)
  const joinedName = [asString(source.firstName), asString(source.lastName)]
    .filter(Boolean)
    .join(' ')
  const fullName = asString(source.fullName) ?? (joinedName || fallbackUsername)
  const firstName = asString(source.firstName) ?? fullName.split(' ')[0] ?? fallbackUsername

  return {
    username: asString(source.username) ?? fallbackUsername,
    fullName,
    firstName,
    email: asString(source.email) ?? '',
  }
}

async function postAuth(path: string, payload: unknown, fallbackError: string): Promise<unknown> {
  const response = await fetch(`${AUTH_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await readJson(response)
  if (!response.ok) {
    throw new Error(errorMessage(data, fallbackError))
  }
  return data
}

export function registerUser(payload: RegisterPayload): Promise<unknown> {
  return postAuth('/register', payload, 'Registration failed')
}

export function loginUser(payload: LoginPayload): Promise<unknown> {
  return postAuth('/login', payload, 'Login failed')
}
