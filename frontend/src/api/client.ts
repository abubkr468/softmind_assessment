import { API_BASE_URL } from '../config/env'

export async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return {}
  try {
    return JSON.parse(text) as unknown
  } catch {
    return {}
  }
}

export function getMessage(data: unknown, fallback: string) {
  if (data && typeof data === 'object' && 'message' in data) {
    const m = (data as { message?: unknown }).message
    if (typeof m === 'string') return m
  }
  return fallback
}

export async function jsonFetch<T>(
  path: string,
  init: RequestInit & { method?: string } = {},
): Promise<T> {
  const hasBody = init.body != null && init.body !== ''
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })
  const data = await parseJson(res)
  if (!res.ok) {
    throw new Error(getMessage(data, `Request failed (${res.status})`))
  }
  return data as T
}
