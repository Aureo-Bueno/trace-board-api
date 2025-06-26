import ActionLog from "../../models/actionLogs";


class ActionLogRepository {
  public actionLog = ActionLog;

  constructor() {
    this.actionLog = ActionLog;
  }

  async findAll() {
    return this.actionLog.findAll();
  }

  async findById(id: string) {
    return this.actionLog.findByPk(id);
  }

  async create(actionLogData: any) {
    return this.actionLog.create(actionLogData);
  }

  async findByUserId(userId: string) {
    return this.actionLog.findAll({ where: { userId } });
  }
}

export default new ActionLogRepository();

