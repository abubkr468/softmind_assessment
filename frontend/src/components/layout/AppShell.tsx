import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/tasks" className="text-lg font-semibold tracking-tight text-slate-900">
            Softmind
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-800">
              {user?.role}
            </span>
            <span className="text-slate-600">{user?.name}</span>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
