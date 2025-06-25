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

export default router;