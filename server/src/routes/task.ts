import express from 'express';
import multer from 'multer';

import {
  addTaskAttachmentHandler,
  assignTaskHandler,
  createTaskHandler,
  listTasksHandler,
  updateTaskStatusHandler,
} from '../controllers/task.controller';
import { authorizeRoles, requireAuth } from '../middleware/auth.middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(requireAuth);

router.post('/tasks', authorizeRoles('Admin'), createTaskHandler);
router.get('/tasks', listTasksHandler);
router.patch(
  '/tasks/:taskId/assign',
  authorizeRoles('Admin', 'Manager'),
  assignTaskHandler
);
router.patch('/tasks/:taskId/status', updateTaskStatusHandler);
router.post(
  '/tasks/:taskId/attachments',
  upload.single('file'),
  addTaskAttachmentHandler
);

export default router;

