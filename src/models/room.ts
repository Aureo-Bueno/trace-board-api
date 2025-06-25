import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";

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
  }
);

export default Room;
