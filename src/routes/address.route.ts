import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import addressController from '../controllers/address.controller';

const router = Router();

router.get('/get-by-user/:userId', asyncHandler(addressController.getAddressByUserId));

export default router;
