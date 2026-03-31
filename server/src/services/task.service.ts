import { Task } from '../models';
import {
  ensureAssignedUserExists,
  validateObjectId,
  validateTaskPriority,
  validateTaskStatus,
} from '../utils/task';
import { uploadBufferToCloudinary } from '../utils/cloudinary';
import {
  buildTaskListCacheKey,
  invalidateTaskListCache,
  readTaskListCache,
  writeTaskListCache,
} from '../utils/task-cache';

type CreateTaskInput = {
  title: string;
  description?: string;
  assignedTo?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
};

export async function createTask(input: CreateTaskInput) {
  const { title, description, assignedTo, status, priority, dueDate } = input;
  if (!title || !title.toString().trim()) {
    const err: any = new Error('title is required');
    err.statusCode = 400;
    throw err;
  }

  await ensureAssignedUserExists(assignedTo);
  const validStatus = validateTaskStatus(status);
  const validPriority = validateTaskPriority(priority);

  const task = await Task.create({
    title: title.toString().trim(),
    description: description || '',
    assignedTo,
    status: validStatus,
    priority: validPriority,
    dueDate: dueDate ? new Date(dueDate) : undefined,
  });

  await invalidateTaskListCache();
  return task;
}

export async function assignTask(taskId: string, assignedTo: string) {
  validateObjectId(taskId, 'task id');
  await ensureAssignedUserExists(assignedTo);

  const task = await Task.findByIdAndUpdate(
    taskId,
    { assignedTo },
    { new: true, runValidators: true }
  );

  if (!task) {
    const err: any = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  await invalidateTaskListCache();
  return task;
}

export async function listTasks(filters: {
  status?: string;
  priority?: string;
  assignedTo?: string;
},
requester: { userId?: string; role?: string }) {
  const cacheKey = buildTaskListCacheKey(filters, requester);
  const cached = await readTaskListCache(cacheKey);
  if (cached) return cached;

  const query: Record<string, any> = {};

  if (filters.status) query.status = validateTaskStatus(filters.status);
  if (filters.priority) query.priority = validateTaskPriority(filters.priority);
  if (filters.assignedTo) {
    validateObjectId(filters.assignedTo, 'assignedTo user id');
    query.assignedTo = filters.assignedTo;
  }

  if (requester.role === 'User') {
    if (!requester.userId) {
      const err: any = new Error('Unauthorized');
      err.statusCode = 401;
      throw err;
    }
    if (filters.assignedTo && filters.assignedTo !== requester.userId) {
      const err: any = new Error('Forbidden: cannot access tasks assigned to other users');
      err.statusCode = 403;
      throw err;
    }
    query.assignedTo = requester.userId;
  }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email role')
    .sort({ createdAt: -1 })
    .lean();
  await writeTaskListCache(cacheKey, tasks);
  return tasks;
}

export async function updateTaskStatus(
  taskId: string,
  status: string,
  requester: { userId?: string; role?: string }
) {
  validateObjectId(taskId, 'task id');
  const validStatus = validateTaskStatus(status);

  const task = await Task.findById(taskId);
  if (!task) {
    const err: any = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  if (requester.role === 'User') {
    if (!requester.userId) {
      const err: any = new Error('Unauthorized');
      err.statusCode = 401;
      throw err;
    }
    if (!task.assignedTo || task.assignedTo.toString() !== requester.userId) {
      const err: any = new Error('Forbidden: cannot update status for this task');
      err.statusCode = 403;
      throw err;
    }
  }

  task.status = (validStatus || task.status) as any;
  await task.save();

  await invalidateTaskListCache();
  return task;
}

export async function addTaskAttachment(
  taskId: string,
  file: { buffer: Buffer; originalname: string },
  requester: { userId?: string; role?: string }
) {
  validateObjectId(taskId, 'task id');

  const task = await Task.findById(taskId);
  if (!task) {
    const err: any = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  if (requester.role === 'User') {
    if (!requester.userId) {
      const err: any = new Error('Unauthorized');
      err.statusCode = 401;
      throw err;
    }
    if (!task.assignedTo || task.assignedTo.toString() !== requester.userId) {
      const err: any = new Error('Forbidden: cannot attach files to this task');
      err.statusCode = 403;
      throw err;
    }
  }

  const upload = await uploadBufferToCloudinary(file.buffer, file.originalname, 'tasks');

  task.attachments = task.attachments || [];
  (task.attachments as any).push({
    url: upload.url,
    publicId: upload.publicId,
    originalName: file.originalname,
  });

  await task.save();
  await invalidateTaskListCache();

  return task;
}

