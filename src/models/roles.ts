import { CreateOptions, DataTypes } from 'sequelize';
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
      afterCreate: (instance: Roles, options: CreateOptions<any>) => {
        logAction('CREATE', instance, options);
        logger.info(`[Roles] Created role with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
      afterUpdate: (instance: Roles, options: CreateOptions<any>) => {
        logAction('UPDATE', instance, options);
        logger.info(`[Roles] Updated role with ID: ${instance.id}, ${JSON.stringify(options)}`);
      },
    },
  }
);

export default Roles;