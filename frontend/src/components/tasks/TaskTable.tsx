import { assigneeLabel } from '../../lib/taskDisplay'
import type { Task } from '../../types/task'

type TaskTableProps = {
  tasks: Task[]
  isLoading: boolean
}

function statusBadgeClass(status: string) {
  switch (status) {
    case 'Pending':
      return 'bg-amber-100 text-amber-800'
    case 'InProgress':
      return 'bg-blue-100 text-blue-800'
    case 'Completed':
      return 'bg-emerald-100 text-emerald-800'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function priorityBadgeClass(priority: string) {
  switch (priority) {
    case 'Low':
      return 'bg-emerald-100 text-emerald-800'
    case 'Medium':
      return 'bg-amber-100 text-amber-800'
    case 'High':
      return 'bg-rose-100 text-rose-800'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

export function TaskTable({ tasks, isLoading }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
          <tr>
            <th className="px-3 py-2 sm:px-4 sm:py-3">Title</th>
            <th className="px-3 py-2 sm:px-4 sm:py-3">Status</th>
            <th className="px-3 py-2 sm:px-4 sm:py-3">Priority</th>
            <th className="px-3 py-2 sm:px-4 sm:py-3">Assignee</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-slate-50/80">
                <td className="px-3 py-2 font-medium text-slate-900 sm:px-4 sm:py-3">
                  {task.title}
                </td>
                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(task.status)}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-600 sm:px-4 sm:py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadgeClass(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-600 sm:px-4 sm:py-3">
                  {assigneeLabel(task)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isLoading && tasks.length === 0 && (
        <p className="p-4 text-center text-sm text-slate-500 sm:p-6">No tasks yet.</p>
      )}
    </div>
  )
}

