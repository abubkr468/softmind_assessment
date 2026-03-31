import type { CSSProperties } from 'react'
import { useDraggable } from '@dnd-kit/core'

import { assigneeLabel } from '../../lib/taskDisplay'
import type { Task } from '../../types/task'

type KanbanCardProps = {
  task: Task
  onUpload: (taskId: string, file: File) => void
}

export function KanbanCard({ task, onUpload }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  })

  const style: CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md ${
        isDragging ? 'opacity-80 ring-2 ring-emerald-500' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
        <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-700">
          {task.priority}
        </span>
      </div>
      {task.description ? (
        <p className="mt-1 line-clamp-3 text-xs text-slate-600">{task.description}</p>
      ) : null}
      <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
        <div>
          <dt className="font-medium text-slate-400">Assignee</dt>
          <dd>{assigneeLabel(task)}</dd>
        </div>
        {task.dueDate ? (
          <div>
            <dt className="font-medium text-slate-400">Due</dt>
            <dd>{new Date(task.dueDate).toLocaleDateString()}</dd>
          </div>
        ) : null}
      </dl>
      {task.attachments && task.attachments.length > 0 && (
        <div className="mt-2 space-y-1">
          <p className="text-[11px] font-medium text-slate-400">Attachments</p>
          <ul className="space-y-1">
            {task.attachments.map((att, index) => (
              <li key={`${att.publicId ?? att.url}-${index}`}>
                <a
                  href={att.url}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-[11px] font-medium text-emerald-700 underline-offset-2 hover:underline"
                >
                  {att.originalName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {task.status === 'InProgress' && (
        <div className="mt-3">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-100">
            Upload attachment
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                onUpload(task._id, file)
                e.target.value = ''
              }}
            />
          </label>
        </div>
      )}
    </li>
  )
}

