import { type ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/** Mount once at app root (see main.tsx). Renders react-toastify container. */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        limit={4}
        theme="light"
      />
    </>
  )
}
