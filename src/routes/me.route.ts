import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import meController from '../controllers/me.controller';
import { authMiddleware } from '../config/middlewares/auth';

const router = Router();

router.get('/', asyncHandler(authMiddleware), asyncHandler(meController.me));

export default router;
