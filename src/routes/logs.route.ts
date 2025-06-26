import { Router } from "express";
import logController from "../controllers/logs.controller";
import { authMiddleware } from "../config/middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get(
  '/',
  asyncHandler(authMiddleware),
  asyncHandler(logController.getAllActionLogs),
);

router.get(
  '/user-logs',
  asyncHandler(authMiddleware),
  asyncHandler(logController.getUserActionLogs),
);

router.post(
  '/logout',
  asyncHandler(authMiddleware),
  asyncHandler(logController.logoutUser),
);

export default router;