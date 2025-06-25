// src/config/database.ts
import { Sequelize } from 'sequelize';
import configEnv from './config.env';

const sequelize = new Sequelize(
  configEnv.get('DB_NAME') || 'your_database',
  configEnv.get('DB_USER') || 'your_username',
  configEnv.get('DB_PASSWORD') || 'your_password',
  {
    host: configEnv.get('DB_HOST') || 'localhost',
    dialect: 'mysql',
  }
);

export default sequelize;
