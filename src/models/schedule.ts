import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";

export type ScheduleStatus = "pending" | "scheduled" | "cancelled";

class Schedule extends BaseModel {
  public userId!: string;
  public roomId!: string;
  public status!: ScheduleStatus;
  public startTime!: string;
}

Schedule.init(
  {
    ...BaseModel.getAttributes(),
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "scheduled", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "schedules",
    sequelize,
    hooks: {
      afterCreate: (instance, options) => {
        logAction("CREATE", instance, options);
      },
      afterUpdate: (instance, options) => {
        logAction("UPDATE", instance, options);
      },
    },
  }
);

export default Schedule;
