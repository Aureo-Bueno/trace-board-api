import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";
import logger from "../config/logger";

export type ScheduleStatus = "pending" | "scheduled" | "cancelled";

class Schedule extends BaseModel {
  public userId!: string;
  public roomId!: string;
  public status!: ScheduleStatus;
  public startTime!: string;
  public endTime!: string | null;
}

Schedule.init(
  {
    ...BaseModel.getAttributes(),
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "scheduled", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    blockTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30,
    },
  },
  {
    tableName: "schedules",
    sequelize,
    hooks: {
      afterCreate: (instance, options) => {
        logAction("CREATE", instance, options);
        logger.info(`[Schedule] Created schedule with ID: ${instance.id}`);
      },
      afterUpdate: (instance, options) => {
        logAction("UPDATE", instance, options);
        logger.info(`[Schedule] Updated schedule with ID: ${instance.id}`);
      },
    },
  }
);

export default Schedule;
