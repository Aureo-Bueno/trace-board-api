import { CreateOptions, DataTypes } from "sequelize";
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
      afterCreate: (instance: UserRoles, options: CreateOptions<any>) => {
        logAction("CREATE", instance, options);
        logger.info(`[UserRoles] Created user role with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
      afterUpdate: (instance: UserRoles, options: CreateOptions<any>) => {
        logAction("UPDATE", instance, options);
        logger.info(`[UserRoles] Updated user role with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
      afterDestroy: (instance: UserRoles, options: CreateOptions<any>) => {
        logAction("DELETE", instance, options);
        logger.info(`[UserRoles] Deleted user role with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
    },
  }
);

export default UserRoles;
