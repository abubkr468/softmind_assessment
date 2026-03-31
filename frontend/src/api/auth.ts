import { API_BASE_URL } from '../config/env'
import { jsonFetch, parseJson } from './client'
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
  return jsonFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function signupRequest(body: SignupPayload): Promise<AuthResponse> {
  return jsonFetch<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function fetchSession(): Promise<{ user: AuthUser } | null> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include' })
  if (res.status === 401) return null
  const data = await parseJson(res)
  if (!res.ok) return null
  return data as { user: AuthUser }
}

export async function logoutRequest(): Promise<void> {
  await jsonFetch<{ message: string }>('/auth/logout', { method: 'POST' })
}
