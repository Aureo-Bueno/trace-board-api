import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import healthCheckController from '../controllers/healthCheck.controller';

const router = Router();

router.get('/', asyncHandler(healthCheckController.getHealthCheck));

export default router;
