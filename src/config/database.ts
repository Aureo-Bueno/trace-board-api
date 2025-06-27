// src/config/database.ts
import { Sequelize } from "sequelize";
import configEnv from "./config.env";
import "mysql2";

const sequelize = new Sequelize(
  configEnv.get("DB_NAME") || "your_database",
  configEnv.get("DB_USER") || "your_username",
  configEnv.get("DB_PASSWORD") || "your_password",
  {
    host: configEnv.get("DB_HOST") || "localhost",
    port: Number(configEnv.get("DB_PORT")) || 3306,
    dialect: "mysql",
  }
);

export default sequelize;
