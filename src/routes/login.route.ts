import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import loginController from '../controllers/login.controller';

const router = Router();

router.post('/', asyncHandler(loginController.login));

export default router;
