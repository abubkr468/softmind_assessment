import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import { AppShell } from '../components/layout/AppShell'

export function ProtectedLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <AppShell />
}
