import { TASK_PRIORITIES, TASK_STATUSES } from '../../types/task'

type TaskFiltersProps = {
  statusFilter: string
  priorityFilter: string
  assigneeFilter?: string
  assigneeOptions?: { id: string; name: string }[]
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  onAssigneeChange?: (value: string) => void
}

export function TaskFilters({
  statusFilter,
  priorityFilter,
  assigneeFilter = 'All',
  assigneeOptions = [],
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
}: TaskFiltersProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold text-slate-900">All tasks</h2>
      <div className="flex flex-wrap gap-2 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-slate-600">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
          >
            <option value="All">All</option>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-600">Priority</span>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
          >
            <option value="All">All</option>
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        {onAssigneeChange && (
          <label className="flex items-center gap-2">
            <span className="text-slate-600">Assignee</span>
            <select
              value={assigneeFilter}
              onChange={(e) => onAssigneeChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
            >
              <option value="All">All</option>
              {assigneeOptions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  )
}

