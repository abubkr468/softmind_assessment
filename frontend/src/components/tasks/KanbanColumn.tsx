import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

import type { Task } from '../../types/task'
import { TASK_STATUSES } from '../../types/task'

type ColumnId = (typeof TASK_STATUSES)[number]

type KanbanColumnProps = {
  id: ColumnId
  tasks: Task[]
  children: ReactNode
}

export function KanbanColumn({ id, tasks, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-3 shadow-sm ring-1 ring-slate-900/5 ${
        isOver ? 'ring-2 ring-emerald-500/70 ring-offset-2 ring-offset-slate-50' : ''
      }`}
    >
      {children}
      <div className="mt-2 text-xs text-slate-500">
        {tasks.length} task{tasks.length === 1 ? '' : 's'}
      </div>
    </div>
  )
}

