export type TaskAssignee = {
  _id: string
  name: string
  email: string
  role: string
}

export type Task = {
  _id: string
  title: string
  description?: string
  status: string
  priority: string
  assignedTo?: TaskAssignee | string | null
  dueDate?: string
  createdAt?: string
  updatedAt?: string
  attachments?: {
    url: string
    publicId?: string
    originalName: string
    createdAt?: string
  }[]
}

export const TASK_STATUSES = ['Pending', 'InProgress', 'Completed'] as const
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const
