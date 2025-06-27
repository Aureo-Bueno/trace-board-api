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

  getSchedules = async (req: Request, res: Response) => {
    const schedules = await this.scheduleService.getSchedulesWithRooms();
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No schedules found" });
    }
    return res.status(200).json(schedules);
  };

  createSchedule = async (req: Request, res: Response) => {
    try {
      const newSchedule = await this.scheduleService.createSchedule(
        req.body,
        req.user?.id || null
      );
      return res.status(201).json(newSchedule);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getSchedulesByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const schedules = await this.scheduleService.getSchedulesByUserId(userId);
    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedules found for this user" });
    }
    return res.status(200).json(schedules);
  };

  createScheduleByUser = async (req: Request, res: Response) => {
    try {
      const newSchedule = await this.scheduleService.createScheduleByUser(
        req.body,
        req.user?.id || null
      );
      return res.status(201).json(newSchedule);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
export default new ScheduleController();
