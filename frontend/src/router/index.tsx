import { Navigate, Route, Routes } from 'react-router-dom'
import { GuestRoute, HomeRedirect, ProtectedLayout } from '../route-guards'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import TasksPage from '../pages/TasksPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        }
      />

      <Route element={<ProtectedLayout />}>
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
