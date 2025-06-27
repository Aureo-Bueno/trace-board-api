import { DataTypes } from "sequelize";
import BaseModel from "./base";
import sequelize from "../config/database";

export type ActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "NAVIGATE_PAGE";

class ActionLog extends BaseModel {
  public userId!: string;
  public actionType!: ActionType;
  public tableName!: string;
  public recordId!: string;
  public oldData!: object | null;
  public newData!: object | null;
  public ipAddress!: string | null;
}

ActionLog.init(
  {
    ...BaseModel.getAttributes(),
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    actionType: {
      type: DataTypes.ENUM(
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "NAVIGATE_PAGE"
      ),
      allowNull: false,
    },

    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    recordId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    oldData: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    newData: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "actionLog",
  }
);

export default ActionLog;

interface LogActionOptions {
  userId?: string;
  ipAddress?: string;
  [key: string]: any;
}

export const logAction = (
  actionType: ActionType,
  instance: any,
  options?: LogActionOptions
) => {
  if (instance.constructor.name === "ActionLog") {
    return;
  }

  const { context } = options || {};

  const logData = {
    userId: context?.userId || null,
    actionType,
    tableName: instance.constructor.tableName,
    recordId: instance.id,
    ipAddress: context?.ipAddress || null,
    oldData: null,
    newData: null,
  };

  if (actionType === "CREATE") {
    logData.newData = instance.toJSON();
  }

  if (actionType === "UPDATE") {
    logData.oldData = instance._previousDataValues;
    logData.newData = instance.toJSON();
  }

  if (actionType === "DELETE") {
    logData.oldData = instance.toJSON();
  }

  if (actionType === "LOGIN" || actionType === "NAVIGATE_PAGE") {
    logData.recordId = instance.id || null;
  }

  ActionLog.create(logData);
};
