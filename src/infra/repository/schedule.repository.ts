import Schedule from "../../models/schedule";

class ScheduleRepository {
  public schedule = Schedule;

  constructor() {
    this.schedule = Schedule;
  }

  async findAll() {
    return this.schedule.findAll();
  }

  async findById(id: string) {
    return this.schedule.findByPk(id);
  }

  async create(scheduleData: any) {
    return await this.schedule.create(scheduleData);
  }

  async update(id: string, scheduleData: any) {
    const schedule = await this.schedule.findByPk(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule.update(scheduleData);
  }

  async delete(id: string) {
    const schedule = await this.schedule.findByPk(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule.update({ deletedAt: new Date() });
  }

  async findByUserId(userId: string) {
    return this.schedule.findAll({ where: { userId, deletedAt: null } });
  }

  async findByStatus(status: string) {
    return await this.schedule.findAll({
      where: { status, deletedAt: null },
    });
  }
}

export default new ScheduleRepository();
