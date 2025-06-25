import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../config/middlewares/auth';
import scheduleController from '../controllers/schedule.controller';

const router = Router();

router.get('/:userId', asyncHandler(authMiddleware), asyncHandler(scheduleController.getScheduleByUserId));

router.put('/', asyncHandler(authMiddleware), asyncHandler(scheduleController.cancelSchedule));

router.get('/schedules-pending', asyncHandler(authMiddleware), asyncHandler(scheduleController.getSchedulesPending));

export default router;
