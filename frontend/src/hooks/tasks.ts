import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignTask, createTask } from '../api/tasks'
import { pushErrorToast, pushToast } from '../utils/toast/notify'

export function useAdminTaskMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
      pushToast({ title: 'Task created', description: 'The new task is in the list.' })
    },
    onError: (err: unknown) => {
      pushErrorToast({
        title: 'Create failed',
        description: err instanceof Error ? err.message : 'Could not create task',
      })
    },
  })

  const assignMutation = useMutation({
    mutationFn: ({ taskId, assignedTo }: { taskId: string; assignedTo: string }) =>
      assignTask(taskId, assignedTo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
      pushToast({ title: 'Assignment updated', description: 'Task assignee saved.' })
    },
    onError: (err: unknown) => {
      pushErrorToast({
        title: 'Assign failed',
        description: err instanceof Error ? err.message : 'Could not assign',
      })
    },
  })

  return { createMutation, assignMutation }
}

