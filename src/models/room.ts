import { CreateOptions, DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";
import logger from "../config/logger";

export type RoomStatus = "available" | "occupied" | "maintenance";

class Room extends BaseModel {
  public name!: string;
  public capacity!: number;
  public location!: string;
  public status!: RoomStatus;

}

Room.init(
  {
    ...BaseModel.getAttributes(),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "occupied", "maintenance"),
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    tableName: "rooms",
    sequelize,
    hooks: {
      afterCreate: (instance: Room, options: CreateOptions<any>) => {
        logAction("CREATE", instance, options);
        logger.info(`[Room] Created room with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
      afterUpdate: (instance: Room, options: CreateOptions<any>) => {
        logAction("UPDATE", instance, options);
        logger.info(`[Room] Updated room with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
    },
  },
);

export default Room;
