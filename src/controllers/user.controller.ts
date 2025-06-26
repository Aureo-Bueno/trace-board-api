import { Request, Response } from "express";
import userService from "../infra/service/user.service";
import { UpdateUserRequest } from "../types/user/user.update";

class UserController {
  public userService: typeof userService;
  constructor() {
    this.userService = userService;
  }

  update = async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.body as UpdateUserRequest);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  };

  getClients = async (req: Request, res: Response) => {
    const clients = await this.userService.getClients();
    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: "No clients found" });
    }
    return res.status(200).json(clients);
  };
}

export default new UserController();
