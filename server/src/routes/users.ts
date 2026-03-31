import express from 'express';

import { listUsersHandler } from '../controllers/users.controller';
import { authorizeRoles, requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/users', requireAuth, authorizeRoles('Admin', 'Manager'), listUsersHandler);

export default router;
