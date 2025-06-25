import Roles from "../../models/roles";

class RoleRepository {
  public role = Roles;

  constructor() {
    this.role = Roles;
  }

  async findAll() {
    return this.role.findAll();
  }

  async findById(id: string) {
    return this.role.findByPk(id);
  }

  async create(roleData: any) {
    return this.role.create(roleData);
  }

  async update(id: string, roleData: any) {
    const role = await this.role.findByPk(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role.update(roleData);
  }

  async delete(id: string) {
    const role = await this.role.findByPk(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role.update({ deletedAt: new Date() });
  }
}

export default new RoleRepository();
