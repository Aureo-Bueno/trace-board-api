import { Request, Response } from "express";
import actionLogsService from "../infra/service/actionLogs.service";

class LogsController {
  public actionLogsService = actionLogsService;

  constructor() {
    this.actionLogsService = actionLogsService;
  }

  getAllActionLogs = async (req: Request, res: Response) => {
    const logs = await this.actionLogsService.getAllActionLogs();
    return res.status(200).json(logs);
  };

  getUserActionLogs = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const logs = await this.actionLogsService.getUserActionLogs(userId?.toString() || "");
    return res.status(200).json(logs);
  };

  logoutUser = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    await this.actionLogsService.logoutUser(userId?.toString() || "");
    return res.status(200).json({ message: "User logged out successfully" });
  };
}

export default new LogsController();


