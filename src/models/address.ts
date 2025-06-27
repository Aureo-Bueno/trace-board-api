import { CreateOptions, DataTypes } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";
import { logAction } from "./actionLogs";
import logger from "../config/logger";

class Address extends BaseModel {
  public userId!: string;
  public zipCode!: string;
  public street!: string;
  public number!: string;
  public complement!: string | null;
  public neighborhood!: string;
  public city!: string;
  public state!: string;
}

Address.init(
  {
    ...BaseModel.getAttributes(),
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      references: {
        model: "users",
        key: "id",
      },
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "addresses",
    sequelize,
    hooks: {
      afterCreate: (instance: Address, options: CreateOptions<any>) => {
        logAction("CREATE", instance, options);
        logger.info(`[Address] Created address with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
      afterUpdate: (instance: Address, options: CreateOptions<any>) => {
        logAction("UPDATE", instance, options);
        logger.info(`[Address] Updated address with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
    },
  }
);

export default Address;