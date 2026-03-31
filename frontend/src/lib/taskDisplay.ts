import type { Task } from '../types/task'

export function assigneeLabel(task: Task): string {
  const a = task.assignedTo
  if (a == null) return '—'
  if (typeof a === 'object' && a !== null && 'name' in a) {
    return (a as { name: string }).name
  }
  return '—'
}
