import { Request, Response } from "express";
import userService from "../infra/service/user.service";
import { UpdateUserRequest } from "../types/user/user.update";

class UserController {
  public userService: typeof userService;
  constructor() {
    this.userService = userService;
  }

  update = async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.body as UpdateUserRequest, req.user?.id || undefined);
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

  deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { status } = req.body;
    const deleted = await this.userService.deleteUser(userId, status, req.user?.id || undefined);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  };

  updateProfile = async (req: Request, res: Response) => {
    if (req?.body?.email) {
      return res.status(400).json({ message: "Email cannot be updated through this endpoint" });
    }
    const user = await this.userService.updateProfile(req.body, req.user?.id || undefined);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  };
}

export default new UserController();
