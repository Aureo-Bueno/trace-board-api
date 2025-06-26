import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";
import logger from "../config/logger";

class UserRoles extends BaseModel {
  public userId!: string;
  public roleId!: string;
}

UserRoles.init(
  {
    ...BaseModel.getAttributes(),
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "user_roles",
    sequelize,
    hooks: {
      afterCreate: (instance, options) => {
        logAction("CREATE", instance, options);
        logger.info(`[UserRoles] Created user role with ID: ${instance.id}`);
      },
      afterUpdate: (instance, options) => {
        logAction("UPDATE", instance, options);
        logger.info(`[UserRoles] Updated user role with ID: ${instance.id}`);
      },
      afterDestroy: (instance, options) => {
        logAction("DELETE", instance, options);
        logger.info(`[UserRoles] Deleted user role with ID: ${instance.id}`);
      },
    },
  }
);

export default UserRoles;
