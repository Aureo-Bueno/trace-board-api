import logger from "../../../config/logger";
import User from "../../../models/user";
import { RegisterRequest } from "../../../types/register";
import JwtUtil from "../../../utils/jwt";
import bcrypt from "bcrypt";
import userService from "../user.service";
import addressService from "../address.service";
import actionLogsService from "../actionLogs.service";

class AuthService {
  public logger = logger;
  public userService = userService;
  public addressService = addressService;
  public actionLogsService = actionLogsService;

  constructor() {
    this.logger = logger;
    this.userService = userService;
    this.addressService = addressService;
    this.actionLogsService = actionLogsService;
  }

  async login(email: string, password: string) {
    this.logger.info("[Login] Attempting to log in user with email:", email);
    const user = await User.findOne({ where: { email, deletedAt: null } });
    if (!user || !(await this.validatePassword(password, user.password))) {
      this.logger.warn("[Login] Invalid login attempt for email:", email);
      throw new Error("Invalid email or password");
    }

    const token = JwtUtil.sign({ id: user.id });
    this.logger.info("[Login] User logged in successfully:", user.id);
    return { token };
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    this.logger.info("[AuthService] Validating password");
    return bcrypt.compare(password, hash);
  }

  async register(body: RegisterRequest): Promise<User> {
    const { email } = body;

    if (await this.userService.getUserByEmail(email)) {
      this.logger.warn("[Register] User with email already exists:", email);
      throw new Error("User with this email already exists");
    }
    this.logger.info("[Register] Creating new user with email:", email);

    const hashedPassword = await this.hashPassword(body.password);
    const user = await this.createUser({ ...body, password: hashedPassword });
    const address = await this.createAddress(body, user.id);
    await this.createRegisterActionLog(user);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async createUser(data: Partial<RegisterRequest> & { password: string }) {
    const { name, lastName, email, password } = data;
    const user = await this.userService.createUser({
      name,
      lastName,
      email,
      password,
      deletedAt: null,
    });
    if (!user) {
      this.logger.error("[Register] Error creating user:", email);
      throw new Error("Error creating user");
    }
    return user;
  }

  private async createAddress(body: RegisterRequest, userId: string) {
    const { city, neighborhood, number, state, street, zipCode, complement } = body;
    const address = await this.addressService.create({
      city,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      complement,
      userId,
    });
    if (!address) {
      this.logger.error("[Register] Error creating address for user:", body.email);
      throw new Error("Error creating address");
    }
    return address;
  }

  private async createRegisterActionLog(user: User) {
    const actionLog = await this.actionLogsService.createActionLog({
      userId: user.id,
      actionType: "LOGIN",
      tableName: "users",
      recordId: user.id,
      ipAddress: null,
      oldData: null,
      newData: { ...user.toJSON(), lastLogin: new Date() },
    });
    this.logger.info(`[Register] Action log created for user: ${user.id}, ${actionLog.id}`);
    return actionLog;
  }
}

export default new AuthService();
