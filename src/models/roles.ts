import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import BaseModel from './base';

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
  }
);

export default Roles;