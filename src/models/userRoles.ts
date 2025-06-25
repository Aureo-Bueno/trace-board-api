import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import BaseModel from "./base";

class UserRoles extends Model {
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
  }
);

export default UserRoles;
