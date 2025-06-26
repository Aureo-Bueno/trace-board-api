import { CreateOptions } from "sequelize";
import Schedule from "../../models/schedule";

class ScheduleRepository {
  public schedule = Schedule;

  constructor() {
    this.schedule = Schedule;
  }

  async findAll(): Promise<Schedule[]> {
    return await this.schedule.findAll();
  }

  async findById(id: string): Promise<Schedule | null> {
    return await this.schedule.findByPk(id);
  }

  async create(
    scheduleData: any,
  ): Promise<Schedule> {
    return await this.schedule.create(scheduleData);
  }

  async update(id: string, scheduleData: any): Promise<Schedule | null> {
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
