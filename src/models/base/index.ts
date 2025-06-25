import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";

class BaseModel extends Model {
  public id!: string;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
  public readonly deletedAt!: string | null; // For soft deletes
}

BaseModel.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "deletedAt",
    },
  },
  {
    timestamps: true,

    paranoid: true,

    underscored: true,

    sequelize,
  }
);

export default BaseModel;
