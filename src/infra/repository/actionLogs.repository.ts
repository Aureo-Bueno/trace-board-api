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
}

export default new ActionLogRepository();

