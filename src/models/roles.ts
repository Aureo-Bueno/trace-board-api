import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import BaseModel from './base';
import { logAction } from './actionLogs';
import logger from '../config/logger';

class Roles extends BaseModel {
  public name!: string;
}

Roles.init(
  {
    ...BaseModel.getAttributes(),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    sequelize,
    hooks: {
      afterCreate: (instance, options) => {
        logAction('CREATE', instance, options);
        logger.info(`[Roles] Created role with ID: ${instance.id}`);
      },
      afterUpdate: (instance, options) => {
        logAction('UPDATE', instance, options);
        logger.info(`[Roles] Updated role with ID: ${instance.id}`);
      },
    },
  }
);

export default Roles;