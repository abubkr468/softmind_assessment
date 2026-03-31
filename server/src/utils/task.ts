import mongoose from 'mongoose';

import { TASK_PRIORITIES, TASK_STATUSES, User } from '../models';

export function validateTaskStatus(status?: string) {
  if (!status) return undefined;
  if (!TASK_STATUSES.includes(status as any)) {
    const err: any = new Error(`Invalid status. Allowed: ${TASK_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }
  return status;
}

export function validateTaskPriority(priority?: string) {
  if (!priority) return undefined;
  if (!TASK_PRIORITIES.includes(priority as any)) {
    const err: any = new Error(
      `Invalid priority. Allowed: ${TASK_PRIORITIES.join(', ')}`
    );
    err.statusCode = 400;
    throw err;
  }
  return priority;
}

export function validateObjectId(id: string, label = 'id') {
  if (!mongoose.isValidObjectId(id)) {
    const err: any = new Error(`Invalid ${label}`);
    err.statusCode = 400;
    throw err;
  }
}

export async function ensureAssignedUserExists(userId?: string) {
  if (!userId) return;
  validateObjectId(userId, 'assignedTo user id');
  const user = await User.findById(userId).lean();
  if (!user) {
    const err: any = new Error('Assigned user not found');
    err.statusCode = 404;
    throw err;
  }

  if (user.role !== 'User') {
    const err: any = new Error('assignedTo must refer to a User role');
    err.statusCode = 400;
    throw err;
  }
}

