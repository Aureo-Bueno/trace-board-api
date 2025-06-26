import express, { Application } from "express";
import sequelize from "./config/database";
import logger from "./config/logger";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./config/middlewares/error";
import logsRoutes from "./routes/logs.route";
import registerRoutes from "./routes/register.route";
import loginRoutes from "./routes/login.route";
import meRoutes from "./routes/me.route";
import { seedDatabase } from "./seed";
import userRoute from "./routes/user.route";
import scheduleRoute from "./routes/schedule.route";
import roomRoute from "./routes/room.route";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(errorHandler);

    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    const stream = {
      write: (message: string) => logger.http(message.trim()),
    };
    this.app.use(morgan("dev", { stream }));
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
  }

  private database(): void {
    sequelize
      .sync()
      .then(async () => {
        logger.info("Database connected successfully");
        //await seedDatabase();
      })
      .catch((error) => {
        logger.error("Database connection failed:", error);
        process.exit(1);
      });
  }

  private routes(): void {
    this.app.use((req, res, next) => { 
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.set('Surrogate-Control', 'no-store');
      next();
    });
    this.app.use("/logs", logsRoutes);
    this.app.use("/login", loginRoutes);
    this.app.use("/register", registerRoutes);
    this.app.use("/me", meRoutes);
    this.app.use("/user", userRoute);
    this.app.use("/schedule", scheduleRoute);
    this.app.use("/room", roomRoute);
  }
}

export default new App().app;
