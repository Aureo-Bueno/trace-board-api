

import { Request, Response } from "express";

class HealthCheckController {
  getHealthCheck = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "OK" });
  };
}

export default new HealthCheckController();
