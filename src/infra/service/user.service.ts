import logger from "../../config/logger";
import User from "../../models/user";
import { UpdateUserRequest } from "../../types/user/user.update";
import userRepository from "../repository/user.repository";
import addressService from "./address.service";
import roleService from "./role.service";
import userRolesService from "./userRoles.service";
import { hashPassword } from "../../utils/hashPassword";

class UserService {
  private userRepository: typeof userRepository;
  private addressService: typeof addressService;
  private userRolesService: typeof userRolesService;
  private roleService: typeof roleService;

  constructor() {
    this.userRepository = userRepository;
    this.addressService = addressService;
    this.userRolesService = userRolesService;
    this.roleService = roleService;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    logger.info(`[GelAllUsers] Retrieved ${users?.length} users`);
    return users;
  }

  async createUser(userData: any, userId?: string): Promise<User> {
    const user = await this.userRepository.create(userData, {
      context: { userId: userId || null },
    } as any);
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

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      logger.warn(`[GetUserById] User with ID ${id} not found`);
      return null;
    }
    logger.info(`[GetUserById] User with ID ${id} found`);
    return user;
  }

  async updateUser(userData: UpdateUserRequest, userId?: string): Promise<User> {
    const user = await this.userRepository.update(userData.id, userData, {
      context: { userId: userId || null },
    } as any);

    logger.info(`[UpdateUser] User with ID ${user.id} updated`);
    return user;
  }

  async getClients() {
    const clients = await this.userRepository.findAll();

    const clientsWithAddress = await Promise.all(
      clients.map(async (client) => {
        const address = await this.addressService.getByUserId(client.id);
        const data = client.dataValues || client;
        const {
          id,
          email,
          name,
          lastName,
          createdAt,
          updatedAt,
          deletedAt,
        } = data;
        const userRoles = await this.userRolesService.getUserRoleById(id);

        const rolePromises = userRoles?.map((role) => this.roleService.getRoleById(role.roleId)) || [];
        const resolvedRoles = await Promise.all(rolePromises);
        const isAdmin = resolvedRoles.some((role) => role?.name === "admin");
        return {
          id,
          email,
          name,
          lastName,
          createdAt,
          updatedAt,
          deletedAt,
          isAdmin: isAdmin,
          address: address
            ? {
                id: address.id,
                zipCode: address.zipCode,
                street: address.street,
                number: address.number,
                complement: address.complement,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
              }
            : null,
        };
      })
    );

    if (!clientsWithAddress || clientsWithAddress.length === 0) {
      logger.warn(`[GetClients] No clients found`);
      return [];
    }
    logger.info(`[GetClients] Retrieved ${clientsWithAddress.length} clients`);
    return clientsWithAddress;
  }

  async deleteUser(userId: string, status: boolean, requesterId?: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.warn(`[DeleteUser] User with ID ${userId} not found`);
      return false;
    }
    await this.userRepository.softDelete(userId, status, {
      context: { userId: requesterId || null },
    } as any);
    logger.info(`[DeleteUser] User with ID ${userId} deleted successfully`);
    return true;
  }

  async updateProfile(userData: any, userId?: string): Promise<User> {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const user = await this.userRepository.update(userData.id, userData, {
      context: { userId: userId || null },
    } as any);

    await this.addressService.updateAddress(userData.address, user.id);
    logger.info(`[UpdateProfile] User with ID ${user.id} profile updated`);
    return user;
  }
}

export default new UserService();
