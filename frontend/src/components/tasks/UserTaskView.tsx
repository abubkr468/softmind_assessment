import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTasks, updateTaskStatus, uploadTaskAttachment } from '../../api/tasks'
import type { Task } from '../../types/task'
import { TASK_STATUSES } from '../../types/task'
import { pushErrorToast, pushToast } from '../../utils/toast/notify'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'

type ColumnId = (typeof TASK_STATUSES)[number]

export function UserTaskView() {
  const queryClient = useQueryClient()

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', 'user'],
    queryFn: () => fetchTasks(),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks', 'user'] })
      pushToast({ title: 'Task status updated' })
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Failed to update task status'
      pushErrorToast({ title: 'Update failed', description: message })
    },
  })

  const uploadAttachmentMutation = useMutation({
    mutationFn: ({ taskId, file }: { taskId: string; file: File }) =>
      uploadTaskAttachment(taskId, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks', 'user'] })
      pushToast({ title: 'Attachment uploaded' })
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Failed to upload attachment'
      pushErrorToast({ title: 'Upload failed', description: message })
    },
  })

  const grouped: Record<ColumnId, Task[]> = {
    Pending: [],
    InProgress: [],
    Completed: [],
  }

  for (const task of tasks as Task[]) {
    const status = (task.status as ColumnId) ?? 'Pending'
    if (grouped[status]) {
      grouped[status].push(task)
    } else {
      grouped.Pending.push(task)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const taskId = String(active.id)
    const destination = over.id as ColumnId
    const currentTask = (tasks as Task[]).find((t) => t._id === taskId)
    if (!currentTask || currentTask.status === destination) return
    if (updateStatusMutation.isPending) return
    void updateStatusMutation.mutate({ taskId, status: destination })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm ring-1 ring-emerald-900/5">
        <h1 className="text-2xl font-semibold text-emerald-950">My tasks</h1>
        <p className="mt-1 text-sm text-emerald-900/80">
          Tasks assigned to you. Drag cards between columns to update status.
        </p>
      </div>

      {isLoading && <p className="text-slate-600">Loading tasks…</p>}
      {error && (
        <p className="text-sm text-red-600">{(error as Error).message}</p>
      )}

      {!isLoading && !error && tasks.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
          No tasks assigned to you yet.
        </p>
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {TASK_STATUSES.map((status) => (
            <KanbanColumn key={status} id={status} tasks={grouped[status]}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  {status === 'Pending'
                    ? 'To do'
                    : status === 'InProgress'
                      ? 'In progress'
                      : 'Completed'}
                </h2>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {grouped[status].length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-100/60 p-2">
                {grouped[status].length === 0 ? (
                  <p className="py-4 text-center text-xs text-slate-400">No tasks</p>
                ) : (
                  <ul className="flex flex-1 flex-col gap-2">
                    {grouped[status].map((task) => (
                      <KanbanCard
                        key={task._id}
                        task={task}
                        onUpload={(taskId, file) => {
                          if (uploadAttachmentMutation.isPending) return
                          uploadAttachmentMutation.mutate({ taskId, file })
                        }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </KanbanColumn>
          ))}
        </div>
      </DndContext>
    </div>
  )
}
