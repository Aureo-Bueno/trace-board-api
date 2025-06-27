import scheduleRepository from "../repository/schedule.repository";
import roomService from "./room.service";
import logger from "../../config/logger";
import userService from "./user.service";

class ScheduleService {
  public scheduleRepository: typeof scheduleRepository;
  private roomService: typeof roomService;
  private logger = logger;
  private userService: typeof userService;

  constructor() {
    this.scheduleRepository = scheduleRepository;
    this.roomService = roomService;
    this.logger = logger;
    this.userService = userService;
  }

  async getScheduleByUserId(userId: string) {
    const schedule = await this.scheduleRepository.findByUserId(userId);
    if (!schedule) {
      this.logger.error(
        `[ScheduleService] Schedule not found for user ID: ${userId}`
      );
      throw new Error("Schedule not found");
    }
    this.logger.info(`[ScheduleService] Schedule found for user ID: ${userId}`);
    return schedule;
  }

  async cancelSchedule(scheduleId: string, userId?: string) {
    const schedule = await this.scheduleRepository.findById(scheduleId);
    if (!schedule) {
      this.logger.error(
        `[ScheduleService] Schedule not found for ID: ${scheduleId}`
      );
      throw new Error("Schedule not found");
    }
    this.logger.info(
      `[ScheduleService] Cancelling schedule with ID: ${scheduleId}`
    );
    return await this.scheduleRepository.update(
      scheduleId,
      {
        status: "cancelled",
      },
      {
        context: { userId: userId || null },
      } as any
    );
  }

  async getSchedulesWithRooms() {
    const schedules = await this.scheduleRepository.findAll();
    if (!schedules || schedules.length === 0) {
      this.logger.error("[ScheduleService] No schedules found");
      throw new Error("No schedules found");
    }
    this.logger.info(`[ScheduleService] Found ${schedules.length} schedules`);
    const schedulesWithRooms = await Promise.all(
      schedules.map(async (schedule) => {
        const scheduleData =
          typeof schedule.toJSON === "function"
            ? schedule.toJSON()
            : schedule.get
            ? schedule.get({ plain: true })
            : schedule;
        const room = await this.roomService.getRoomById(scheduleData.roomId);
        const user = await this.userService.getUserById(scheduleData.userId);
        return {
          id: scheduleData.id,
          userId: scheduleData.userId,
          fullNameUser: user ? `${user.name} ${user.lastName}` : null,
          roomId: scheduleData.roomId,
          status: scheduleData.status,
          startTime: scheduleData.startTime,
          createdAt: scheduleData.createdAt,
          updatedAt: scheduleData.updatedAt,
          deletedAt: scheduleData.deletedAt,
          room: room ? { id: room.id, name: room.name } : null,
        };
      })
    );
    this.logger.info(`[ScheduleService] Enriched schedules with room data`);

    return schedulesWithRooms;
  }

  async createSchedule(scheduleData: any, userId: string | null = null) {
    const newSchedule = await this.scheduleRepository.create(
      {
        ...scheduleData,
        userId: userId || null,
      },
      {
        context: { userId: userId || null },
      } as any
    );
    this.logger.info(
      `[ScheduleService] Created new schedule with ID: ${newSchedule.id}`
    );
    return newSchedule;
  }

  async getSchedulesByUserId(
    userId: string
  ): Promise<{ id: string; status: string; startTime: Date; room: {} }[]> {
    const schedules = await this.scheduleRepository.findByUserId(userId);
    if (!schedules || schedules.length === 0) {
      this.logger.error(
        `[ScheduleService] No schedules found for user ID: ${userId}`
      );
      throw new Error("No schedules found for this user");
    }
    this.logger.info(
      `[ScheduleService] Found ${schedules.length} schedules for user ID: ${userId}`
    );
    return await Promise.all(
      schedules.map(async (schedule) => {
        const scheduleData =
          typeof schedule.toJSON === "function"
            ? schedule.toJSON()
            : schedule.get
            ? schedule.get({ plain: true })
            : schedule;
        const room = await this.roomService.getRoomById(scheduleData.roomId);
        return {
          id: scheduleData.id,
          status: scheduleData.status,
          startTime: scheduleData.startTime,
          room: scheduleData.roomId
            ? { id: scheduleData.roomId, name: room ? room.name : "Unknown" }
            : {},
        };
      })
    );
  }

  createScheduleByUser = async (
    scheduleData: any,
    userId: string | null = null
  ) => {
    try {
      let formattedStartTime = scheduleData.startTime;
      if (scheduleData.date && scheduleData.startTime) {
        const dateTimeString = `${scheduleData.date}T${scheduleData.startTime}:00.000Z`;
        formattedStartTime = new Date(dateTimeString);
      }
      const newSchedule = await this.scheduleRepository.create(
        {
          ...scheduleData,
          startTime: formattedStartTime,
        },
        {
          context: { userId: userId || null },
        } as any
      );
      await this.roomService.updateRoomStatus(
        newSchedule.roomId,
        "occupied",
        userId ?? undefined
      );
      this.logger.info(
        `[ScheduleService] Created new schedule with ID: ${newSchedule.id}`
      );
      return newSchedule;
    } catch (error: any) {
      this.logger.error(
        `[ScheduleService] Error creating schedule: ${error.message}`
      );
      throw error;
    }
  };
}

export default new ScheduleService();
