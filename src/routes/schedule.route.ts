import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../config/middlewares/auth';
import scheduleController from '../controllers/schedule.controller';

const router = Router();

router.get('/schedules', asyncHandler(authMiddleware), asyncHandler(scheduleController.getSchedules));
router.get('/:userId', asyncHandler(authMiddleware), asyncHandler(scheduleController.getScheduleByUserId));
router.get('/get-schedule-user/:userId', asyncHandler(authMiddleware), asyncHandler(scheduleController.getSchedulesByUserId));
router.put('/', asyncHandler(authMiddleware), asyncHandler(scheduleController.cancelSchedule));
router.post('/', asyncHandler(authMiddleware), asyncHandler(scheduleController.createSchedule));
router.post('/create-schedule-by-user', asyncHandler(authMiddleware), asyncHandler(scheduleController.createScheduleByUser));

export default router;
