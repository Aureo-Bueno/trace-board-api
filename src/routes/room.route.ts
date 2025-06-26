import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import roomController from '../controllers/room.controller';

const roomRoute = Router();
roomRoute.get('/', asyncHandler(roomController.getRooms));
roomRoute.post('/', asyncHandler(roomController.createRoom));

export default roomRoute;
