import {
  addTaskAttachment,
  assignTask,
  createTask,
  listTasks,
  updateTaskStatus,
} from '../services/task.service';

export async function createTaskHandler(req: any, res: any) {
  try {
    const result = await createTask(req.body || {});
    return res.status(201).json(result);
  } catch (err) {
    const status = (err as any)?.statusCode || 400;
    return res.status(status).json({ message: (err as any)?.message || 'Failed to create task' });
  }
}

export async function assignTaskHandler(req: any, res: any) {
  try {
    const { taskId } = req.params || {};
    const { assignedTo } = req.body || {};

    if (!assignedTo) {
      return res.status(400).json({ message: 'assignedTo is required' });
    }

    const result = await assignTask(taskId, assignedTo);
    return res.json(result);
  } catch (err) {
    const status = (err as any)?.statusCode || 400;
    return res.status(status).json({ message: (err as any)?.message || 'Failed to assign task' });
  }
}

export async function listTasksHandler(req: any, res: any) {
  try {
    const { status, priority, assignedTo } = req.query || {};
    const requester = req.user || {};
    const result = await listTasks(
      { status, priority, assignedTo },
      { userId: requester.id, role: requester.role }
    );
    return res.json(result);
  } catch (err) {
    const statusCode = (err as any)?.statusCode || 400;
    return res
      .status(statusCode)
      .json({ message: (err as any)?.message || 'Failed to fetch tasks' });
  }
}

export async function updateTaskStatusHandler(req: any, res: any) {
  try {
    const { taskId } = req.params || {};
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const requester = req.user || {};
    const result = await updateTaskStatus(taskId, status, {
      userId: requester.id,
      role: requester.role,
    });
    return res.json(result);
  } catch (err) {
    const statusCode = (err as any)?.statusCode || 400;
    return res
      .status(statusCode)
      .json({ message: (err as any)?.message || 'Failed to update task status' });
  }
}

export async function addTaskAttachmentHandler(req: any, res: any) {
  try {
    const { taskId } = req.params || {};
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'file is required' });
    }

    const requester = req.user || {};
    const result = await addTaskAttachment(taskId, file, {
      userId: requester.id,
      role: requester.role,
    });
    return res.status(201).json(result);
  } catch (err) {
    const statusCode = (err as any)?.statusCode || 400;
    return res
      .status(statusCode)
      .json({ message: (err as any)?.message || 'Failed to upload attachment' });
  }
}

