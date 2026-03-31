export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

export type AuthResponse = {
  user: AuthUser
  token: string
}

export const USER_ROLES = ['User', 'Manager', 'Admin'] as const
