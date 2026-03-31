import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from "lucide-react"
import { TASK_PRIORITIES, TASK_STATUSES } from '../../types/task'

type CreateTaskDialogProps = {
    title: string
    description: string
    priority: string
    status: string
    assignedTo: string
    dueDate: string
    users: { id: string; name: string; role: string }[]
    onTitleChange: (v: string) => void
    onDescriptionChange: (v: string) => void
    onPriorityChange: (v: string) => void
    onStatusChange: (v: string) => void
    onAssignedToChange: (v: string) => void
    onDueDateChange: (v: string) => void
    onSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    open: boolean
    onOpenChange: (open: boolean) => void
  }

export function CreateTaskDialog(props: CreateTaskDialogProps) {
    const {
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
      users,
      onTitleChange,
      onDescriptionChange,
      onPriorityChange,
      onStatusChange,
      onAssignedToChange,
      onDueDateChange,
      onSubmit,
      isSubmitting,
      open,
      onOpenChange,
    } = props
  
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" aria-hidden />
            New task
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-violet-200/70 bg-white p-6 shadow-xl shadow-violet-900/10 ring-1 ring-slate-900/5">
            <Dialog.Title className="text-lg font-semibold text-slate-900">
              Create task
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-slate-600">
              Capture the essentials and optionally assign it immediately.
            </Dialog.Description>
  
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Title *</span>
                  <input
                    required
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="e.g. Review Q1 report"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Description</span>
                  <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Priority</span>
                  <select
                    value={priority}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {TASK_PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Status</span>
                  <select
                    value={status}
                    disabled={true}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Due date</span>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => onDueDateChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Assign to</span>
                  <select
                    value={assignedTo}
                    required
                    onChange={(e) => onAssignedToChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option value="">Unassigned</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating…' : 'Create task'}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }