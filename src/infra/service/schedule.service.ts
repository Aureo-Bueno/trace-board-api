import scheduleRepository from "../repository/schedule.repository";

class ScheduleService {
  public scheduleRepository: typeof scheduleRepository;

  constructor() {
    this.scheduleRepository = scheduleRepository;
  }

  async getScheduleByUserId(userId: string) {
    const schedule = await this.scheduleRepository.findByUserId(userId);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule;
  }

  async cancelSchedule(scheduleId: string) {
    const schedule = await this.scheduleRepository.findById(scheduleId);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return await this.scheduleRepository.update(scheduleId, {
      status: "cancelled",
    });
  }

  async getSchedulesPending() {
    const schedules = await this.scheduleRepository.findByStatus("pending");
    if (!schedules || schedules.length === 0) {
      throw new Error("No pending schedules found");
    }
    return schedules;
  }
}

export default new ScheduleService();
