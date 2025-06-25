import logger from "../../config/logger";
import roleRepository from "../repository/role.repository";

class RoleService {
  private roleRepository: typeof roleRepository;
  private logger: typeof logger;

  constructor() {
    this.roleRepository = roleRepository;
    this.logger = logger;
  }

  async createRole(roleData: any) {
    const role = await this.roleRepository.create(roleData);
    this.logger.info(`[CreateRole] Role created with ID: ${role.id}`);
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    this.logger.info(`[GetAllRoles] Retrieved ${roles?.length} roles`);
    return roles;
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      this.logger.warn(`[GetRoleById] Role with ID ${id} not found`);
      return null;
    }
    this.logger.info(`[GetRoleById] Role with ID ${id} found`);
    return role;
  }
}

export default new RoleService();
