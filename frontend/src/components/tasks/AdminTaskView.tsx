import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTasks } from '../../api/tasks'
import { fetchAssignableUsers } from '../../api/users'
import { useAdminTaskMutations } from '../../hooks/tasks'
import { CreateTaskDialog } from './CreateTaskDialog'
import { TaskFilters } from './TaskFilters'
import { TaskTable } from './TaskTable'
import { UsersTable } from './UsersTable'
import type { Task } from '../../types/task'
 

export function AdminTaskView() {
  const { createMutation } = useAdminTaskMutations()
  const [activeTab, setActiveTab] = useState<'tasks' | 'users'>('tasks')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<string>('Medium')
  const [status, setStatus] = useState<string>('Pending')
  const [assignedTo, setAssignedTo] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', 'admin', { statusFilter, priorityFilter, assigneeFilter }],
    queryFn: () =>
      fetchTasks({
        ...(statusFilter !== 'All' ? { status: statusFilter } : {}),
        ...(priorityFilter !== 'All' ? { priority: priorityFilter } : {}),
        ...(assigneeFilter !== 'All' ? { assignedTo: assigneeFilter } : {}),
      }),
  })

  const { data: users = [] } = useQuery({
    queryKey: ['users', 'admin'],
    queryFn: () => fetchAssignableUsers(),
  })

  const assignableUsers = users.filter((u) => u.role === 'User')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await createMutation.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        status,
        dueDate: dueDate || undefined,
        assignedTo: assignedTo || undefined,
      })
      setIsDialogOpen(false)
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setStatus('Pending')
      setAssignedTo('')
      setDueDate('')
    } catch {
      // handled via toast in hook
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm ring-1 ring-violet-900/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-violet-950">Admin · Task control</h1>
            <p className="mt-1 text-sm text-violet-900/80">
              Create tasks, see everything on the board, and assign work to any user.
            </p>
            <div className="mt-4 inline-flex rounded-full border border-violet-200 bg-violet-50/80 p-1 text-xs font-medium text-violet-900 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('tasks')}
                className={`rounded-full px-3 py-1 transition ${
                  activeTab === 'tasks'
                    ? 'bg-white text-violet-950 shadow-sm'
                    : 'text-violet-700 hover:text-violet-900'
                }`}
              >
                Tasks
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`rounded-full px-3 py-1 transition ${
                  activeTab === 'users'
                    ? 'bg-white text-violet-950 shadow-sm'
                    : 'text-violet-700 hover:text-violet-900'
                }`}
              >
                Users
              </button>
            </div>
          </div>
          <CreateTaskDialog
            title={title}
            description={description}
            priority={priority}
            status={status}
            assignedTo={assignedTo}
            dueDate={dueDate}
            users={assignableUsers}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onPriorityChange={setPriority}
            onStatusChange={setStatus}
            onAssignedToChange={setAssignedTo}
            onDueDateChange={setDueDate}
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
      </div>

      {activeTab === 'tasks' ? (
        <div>
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            assigneeFilter={assigneeFilter}
            assigneeOptions={assignableUsers.map((u) => ({ id: u.id, name: u.name }))}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onAssigneeChange={setAssigneeFilter}
          />
          {isLoading && <p className="text-slate-600">Loading tasks…</p>}
          {error && (
            <p className="text-sm text-red-600">{(error as Error).message}</p>
          )}
          <TaskTable tasks={tasks as Task[]} isLoading={isLoading} />
        </div>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  )
}
