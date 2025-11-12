import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { listUsers, suspendUser, unsuspendUser, deleteUserAdmin } from '../controllers/admin.controller.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/users', listUsers);
router.patch('/users/:id/suspend', suspendUser);
router.patch('/users/:id/unsuspend', unsuspendUser);
router.delete('/users/:id', deleteUserAdmin);

export default router;

