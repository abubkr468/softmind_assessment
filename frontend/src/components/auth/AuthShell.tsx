import type { ReactNode } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  icon?: ReactNode
}

function DefaultIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-600/15">
      <LockKeyhole className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    </div>
  )
}

export function AuthShell({ title, description, children, footer, icon }: AuthShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            Back to home
          </Link>
        </div>

        <div
          className={cn(
            'rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-xl shadow-slate-900/5',
            'ring-1 ring-slate-900/5 backdrop-blur-sm',
          )}
        >
          <div className="flex flex-col items-center text-center">
            {icon ?? <DefaultIcon />}
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          </div>

          <div className="mt-8">{children}</div>

          {footer ? <div className="mt-8 border-t border-slate-100 pt-6 text-center">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}
