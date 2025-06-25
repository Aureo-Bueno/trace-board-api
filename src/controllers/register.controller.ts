import { Request, Response } from "express";
import authService from "../infra/service/auth/auth.service";
import { RegisterRequest } from "../types/register";

class RegisterController {
  public authService = authService;

  constructor() {
    this.authService = authService;
  }

  register = async (req: Request, res: Response) => {
    const body = req.body as RegisterRequest;
    const response = await this.authService.register(body);
    res.status(201).json(response);
  };
}

export default new RegisterController();