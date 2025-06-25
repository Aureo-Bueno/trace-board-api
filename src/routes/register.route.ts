import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import registerController from '../controllers/register.controller';

const router = Router();

router.post('/', asyncHandler(registerController.register));

export default router;
