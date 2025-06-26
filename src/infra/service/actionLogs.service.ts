import logger from "../../config/logger";
import ActionLog from "../../models/actionLogs";
import actionLogRepository from "../repository/actionLogs.repository";
import userService from "./user.service";

class ActionLogsService {
  private actionLogRepository: typeof actionLogRepository;
  private logger = logger;
  private userService: typeof userService;

  constructor() {
    this.actionLogRepository = actionLogRepository;
    this.logger = logger;
    this.userService = userService;
  }

  async getAllActionLogs() {
    const actionLogs = await this.actionLogRepository.findAll();

    const actionTypeMap: Record<string, string> = {
      CREATE: "Criação",
      UPDATE: "Atualização",
      DELETE: "Exclusão",
      LOGIN: "Login",
      NAVIGATE_PAGE: "Navegação",
    };

    const tableNameMap: Record<string, string> = {
      addresses: "Endereços",
      users: "Usuários",
      roles: "Funções",
      rooms: "Salas",
      schedules: "Agendas",
      user_roles: "Papéis de Usuário",
    };

    const response = await Promise.all(
      actionLogs.map(async (log) => {
        const user = await this.userService.getUserById(log.userId);
        return {
          id: log.id,
          actionType: actionTypeMap[log.actionType] || log.actionType,
          tableName: tableNameMap[log.tableName] || log.tableName,
          recordId: log.recordId,
          createdAt: log.createdAt,
          user: {
            id: user?.id,
            name: user?.name,
            lastName: user?.lastName,
          },
          ipAddress: log.ipAddress,
        };
      })
    );

    this.logger.info(
      `[GetAllActionLogs] Retrieved ${response.length} action logs`
    );
    return response;
  }

  async createActionLog(actionLogData: any): Promise<ActionLog> {
    const actionLog = await this.actionLogRepository.create(actionLogData);
    this.logger.info(
      `[CreateActionLog] Created action log with ID: ${actionLog.id}`
    );
    return actionLog;
  }

  async getUserActionLogs(userId: string) {
    const actionLogs = await this.actionLogRepository.findByUserId(userId);

    if (!actionLogs || actionLogs.length === 0) {
      this.logger.warn(
        `[GetUserActionLogs] No action logs found for user ID: ${userId}`
      );
      return [];
    }

    const actionTypeMap: Record<string, string> = {
      CREATE: "Criação",
      UPDATE: "Atualização",
      DELETE: "Exclusão",
      LOGIN: "Login",
      NAVIGATE_PAGE: "Navegação",
    };

    const tableNameMap: Record<string, string> = {
      addresses: "Endereços",
      users: "Usuários",
      roles: "Funções",
      rooms: "Salas",
      schedules: "Agendas",
      user_roles: "Papéis de Usuário",
    };

    this.logger.info(
      `[GetUserActionLogs] Retrieved ${actionLogs.length} action logs for user ID: ${userId}`
    );
    return actionLogs.map((log) => ({
      id: log.id,
      type: actionTypeMap[log.actionType] || log.actionType,
      module: tableNameMap[log.tableName] || log.tableName,
      recordId: log.recordId,
    }));
  }

  async logoutUser(userId: string) {
    const actionLogData = {
      userId,
      actionType: "LOGOUT",
      tableName: "users",
      recordId: userId,
      ipAddress: null,
    };

    await this.createActionLog(actionLogData);
    this.logger.info(`[LogoutUser] User with ID: ${userId} logged out`);
  }
}

export default new ActionLogsService();
