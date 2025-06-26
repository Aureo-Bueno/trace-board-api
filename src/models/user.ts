import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";
import logger from "../config/logger";

class User extends BaseModel {
  public email!: string;
  public password!: string;
  public name?: string;
  public lastName?: string;
}

User.init(
  {
    ...BaseModel.getAttributes(),
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
    hooks: {
      afterCreate: (instance, options) => {
        logAction("CREATE", instance, options);
        logger.info(`[User] Created user with ID: ${instance.id}`);
      },
      afterUpdate: (instance, options) => {
        logAction("UPDATE", instance, options);
        logger.info(`[User] Updated user with ID: ${instance.id}`);
      },
      afterDestroy: (instance, options) => {
        logAction("DELETE", instance, options);
        logger.info(`[User] Deleted user with ID: ${instance.id}`);
      },
    },
  }
);

export default User;
