import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../config/middlewares/auth';
import userController from '../controllers/user.controller';

const router = Router();

router.put('/', asyncHandler(authMiddleware), asyncHandler(userController.update));
router.put('/update-profile', asyncHandler(authMiddleware), asyncHandler(userController.updateProfile));
router.put('/:userId/delete', asyncHandler(authMiddleware), asyncHandler(userController.deleteUser));
router.get('/clients', asyncHandler(authMiddleware), asyncHandler(userController.getClients));

export default router;
