import express from 'express';

import { login, logout, me, signup } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();


router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/me', requireAuth, me);
router.post('/auth/logout', requireAuth, logout);

export default router;

