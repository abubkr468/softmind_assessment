import { API_BASE_URL } from '../config/env'
import { clearAccessToken, getAccessToken, jsonFetch, parseJson, setAccessToken } from './client'
import type { AuthResponse, AuthUser } from '../types/auth'

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
  role: string
}

export async function loginRequest(body: LoginPayload): Promise<AuthResponse> {
  const data = await jsonFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  setAccessToken(data.token)
  return data
}

export async function signupRequest(body: SignupPayload): Promise<AuthResponse> {
  const data = await jsonFetch<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  setAccessToken(data.token)
  return data
}

export async function fetchSession(): Promise<{ user: AuthUser } | null> {
  const token = getAccessToken()
  const headers = new Headers()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: 'include',
    headers,
  })
  if (res.status === 401) {
    clearAccessToken()
    return null
  }
  const data = await parseJson(res)
  if (!res.ok) return null
  return data as { user: AuthUser }
}

export async function logoutRequest(): Promise<void> {
  try {
    await jsonFetch<{ message: string }>('/auth/logout', { method: 'POST' })
  } finally {
    clearAccessToken()
  }
}
