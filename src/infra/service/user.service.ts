import logger from "../../config/logger";
import { UpdateUserRequest } from "../../types/user/user.update";
import userRepository from "../repository/user.repository";

class UserService {
  private userRepository: typeof userRepository;

  constructor() {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    logger.info(`[GelAllUsers] Retrieved ${users?.length} users`);
    return users;
  }

  async createUser(userData: any) {
    const user = await this.userRepository.create(userData);
    logger.info(`[CreateUser] User created with ID: ${user.id}`);
    return user;
  }

  async getUserByEmail(email: string): Promise<boolean> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      logger.warn(`[GetUserByEmail] User with email ${email} exists`);
      return false;
    }
    logger.info(`[GetUserByEmail] User with email ${email} found`);
    return true;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      logger.warn(`[GetUserById] User with ID ${id} not found`);
      return null;
    }
    logger.info(`[GetUserById] User with ID ${id} found`);
    return user;
  }

  async updateUser(userData: UpdateUserRequest) {
    const user = await this.userRepository.update(userData.id, userData);

    logger.info(`[UpdateUser] User with ID ${user.id} updated`);
    return user;
  }
}

export default new UserService();
