import { jsonFetch, getMessage, parseJson } from './client'
import type { Task } from '../types/task'
import { API_BASE_URL } from '../config/env'

export type CreateTaskBody = {
  title: string
  description?: string
  status?: string
  priority?: string
  dueDate?: string
  assignedTo?: string
}

export async function fetchTasks(query?: Record<string, string>): Promise<Task[]> {
  const qs = query && Object.keys(query).length
    ? `?${new URLSearchParams(query).toString()}`
    : ''
  return jsonFetch<Task[]>(`/tasks${qs}`)
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  return jsonFetch<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function assignTask(taskId: string, assignedTo: string): Promise<Task> {
  return jsonFetch<Task>(`/tasks/${taskId}/assign`, {
    method: 'PATCH',
    body: JSON.stringify({ assignedTo }),
  })
}

export async function updateTaskStatus(taskId: string, status: string): Promise<Task> {
  return jsonFetch<Task>(`/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export async function uploadTaskAttachment(taskId: string, file: File): Promise<Task> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}/attachments`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  const data = await parseJson(res)
  if (!res.ok) {
    throw new Error(getMessage(data, `Request failed (${res.status})`))
  }
  return data as Task
}
