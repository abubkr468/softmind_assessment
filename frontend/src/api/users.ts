import { jsonFetch } from './client'

export type UserSummary = {
  id: string
  name: string
  email: string
  role: string
}

export async function fetchAssignableUsers(): Promise<UserSummary[]> {
  const data = await jsonFetch<{ users: UserSummary[] }>('/users')
  return data.users
}
