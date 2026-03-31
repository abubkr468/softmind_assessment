import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { assignTask, fetchTasks } from '../../api/tasks'
import { fetchAssignableUsers } from '../../api/users'
import { TaskFilters } from './TaskFilters'
import { TaskTable } from './TaskTable'
import { pushErrorToast, pushToast } from '../../utils/toast/notify'
import type { Task } from '../../types/task'

export function ManagerTaskView() {
  const queryClient = useQueryClient()

  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All')

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', 'manager', { statusFilter, priorityFilter, assigneeFilter }],
    queryFn: () =>
      fetchTasks({
        ...(statusFilter !== 'All' ? { status: statusFilter } : {}),
        ...(priorityFilter !== 'All' ? { priority: priorityFilter } : {}),
        ...(assigneeFilter !== 'All' ? { assignedTo: assigneeFilter } : {}),
      }),
  })

  const { data: users = [] } = useQuery({
    queryKey: ['users', 'assignable', 'user-role-only'],
    queryFn: async () => {
      const all = await fetchAssignableUsers()
      return all.filter((u) => u.role === 'User')
    },
  })

  const assignMutation = useMutation({
    mutationFn: ({ taskId, assignedTo }: { taskId: string; assignedTo: string }) =>
      assignTask(taskId, assignedTo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] })
      pushToast({ title: 'Task updated', description: 'Assignment saved.' })
    },
    onError: (err: unknown) => {
      pushErrorToast({
        title: 'Assign failed',
        description: err instanceof Error ? err.message : 'Could not assign',
      })
    },
  })

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm ring-1 ring-amber-900/5">
        <h1 className="text-2xl font-semibold text-amber-950">Manager · Operations</h1>
        <p className="mt-1 text-sm text-amber-900/80">
          View all tasks and assign them to team members. Creating tasks is limited to admins.
        </p>
      </div>

      {isLoading && <p className="text-slate-600">Loading tasks…</p>}
      {error && (
        <p className="text-sm text-red-600">{(error as Error).message}</p>
      )}

      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        assigneeFilter={assigneeFilter}
        assigneeOptions={users.map((u) => ({ id: u.id, name: u.name }))}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onAssigneeChange={setAssigneeFilter}
      />

      <TaskTable tasks={tasks as Task[]} isLoading={isLoading} />
    </div>
  )
}
