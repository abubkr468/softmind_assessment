import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginRequest, signupRequest } from '../api/auth'
import { useAuth } from '../contexts/useAuth'
import { pushErrorToast, pushToast } from '../utils/toast/notify'

function getErrorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback
}

export function useLoginMutation() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setUser(data.user)
      pushToast({
        title: 'Signed in',
        description: `Welcome back, ${data.user.name}.`,
      })
      queueMicrotask(() => navigate('/tasks', { replace: true }))
    },
    onError: (err: unknown) => {
      pushErrorToast({
        title: 'Login failed',
        description: getErrorMessage(err, 'Login failed'),
      })
    },
  })
}

export function useSignupMutation() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      setUser(data.user)
      pushToast({
        title: 'Account created',
        description: `Welcome, ${data.user.name}.`,
      })
      queueMicrotask(() => navigate('/tasks', { replace: true }))
    },
    onError: (err: unknown) => {
      pushErrorToast({
        title: 'Signup failed',
        description: getErrorMessage(err, 'Signup failed'),
      })
    },
  })
}
