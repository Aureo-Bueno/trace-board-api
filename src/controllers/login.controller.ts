import { Request, Response } from "express";
import authService from "../infra/service/auth/auth.service";

class LoginController {
  public authService = authService;

  constructor() {
    this.authService = authService;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { token } = await this.authService.login(email, password);
    res.status(200).json({
      token,
    });
  };
}

export default new LoginController();
