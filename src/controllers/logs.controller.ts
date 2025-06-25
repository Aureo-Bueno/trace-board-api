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
}

export default new LogsController();


