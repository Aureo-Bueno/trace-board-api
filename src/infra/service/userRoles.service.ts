import logger from "../../config/logger";
import userRolesRepository from "../repository/userRoles.repository";

class UserRolesService {
  private userRolesRepository: typeof userRolesRepository;
  private logger: typeof logger;

  constructor() {
    this.userRolesRepository = userRolesRepository;
    this.logger = logger;
  }

  async createUserRoles(roleData: any) {
    const userRole = await this.userRolesRepository.create(roleData);
    this.logger.info(`[CreateUserRoles] Role created with ID: ${userRole.toJSON()}`);
    return userRole;
  }

  async getAllUserRoles() {
    const roles = await this.userRolesRepository.findAll();
    this.logger.info(`[GetAllUserRoles] Retrieved ${roles?.length} roles`);
    return roles;
  }

  async getUserRoleById(id: string) {
    const role = await this.userRolesRepository.findByUserId(id);
    if (!role) {
      this.logger.warn(`[GetUserRoleById] Role with ID ${id} not found`);
      return null;
    }
    this.logger.info(`[GetUserRoleById] Role with ID ${id} found`);
    return role;
  }
}

export default new UserRolesService();
