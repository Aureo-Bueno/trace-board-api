import { Request, Response } from "express";
import meService from "../infra/service/me.service";

class MeController {
  public meService: typeof meService;
  constructor() {
    this.meService = meService;
  }

  me = async (req: Request, res: Response) => {
    const user = req.user;
    const userData = await this.meService.me(user);
    return res.status(200).json(userData);
  };
}

export default new MeController();
