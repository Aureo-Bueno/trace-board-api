import logger from "../../config/logger";
import ActionLog from "../../models/actionLogs";
import actionLogRepository from "../repository/actionLogs.repository";

class ActionLogsService {
  private actionLogRepository: typeof actionLogRepository;
  private logger = logger;

  constructor() {
    this.actionLogRepository = actionLogRepository;
    this.logger = logger;
  }

  async getAllActionLogs() {
    const actionLogs = await this.actionLogRepository.findAll();
    
    this.logger.info(`[GetAllActionLogs] Retrieved ${actionLogs?.length} action logs`);
    return actionLogs;
  }

  async createActionLog(actionLogData: any): Promise<ActionLog> {
    const actionLog = await this.actionLogRepository.create(actionLogData);
    this.logger.info(`[CreateActionLog] Created action log with ID: ${actionLog.id}`);
    return actionLog;
  }
}

export default new ActionLogsService();
