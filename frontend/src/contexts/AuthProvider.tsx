import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSession, logoutRequest } from '../api/auth'
import type { AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const refreshSession = useCallback(async () => {
    const data = await fetchSession()
    setUser(data?.user ?? null)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await fetchSession()
      if (!cancelled) setUser(data?.user ?? null)
      if (!cancelled) setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } finally {
      setUser(null)
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      logout,
      refreshSession,
    }),
    [user, loading, logout, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
