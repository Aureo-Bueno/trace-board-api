import { Request, Response } from "express";
import scheduleService from "../infra/service/schedule.service";

class ScheduleController {
  public scheduleService: typeof scheduleService;

  constructor() {
    this.scheduleService = scheduleService;
  }

  getScheduleByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const schedule = await this.scheduleService.getScheduleByUserId(userId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    return res.status(200).json(schedule);
  };

  cancelSchedule = async (req: Request, res: Response) => {
    const schedule = await this.scheduleService.cancelSchedule(req.body.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    return res.status(200).json(schedule);
  };

  getSchedulesPending = async (req: Request, res: Response) => {
    const schedules = await this.scheduleService.getSchedulesPending();
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No pending schedules found" });
    }
    return res.status(200).json(schedules);
  };
}
export default new ScheduleController();
