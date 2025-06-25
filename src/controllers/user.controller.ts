import { Request, Response } from "express";
import userService from "../infra/service/user.service";
import { UpdateUserRequest } from "../types/user/user.update";

class UserController {
  public userService: typeof userService;
  constructor() {
    this.userService = userService;
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.body as UpdateUserRequest);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
}

export default new UserController();
