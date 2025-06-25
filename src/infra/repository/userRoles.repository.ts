import UserRoles from "../../models/userRoles";

class UserRolesRepository {
  public userRoles = UserRoles;

  constructor() {
    this.userRoles = UserRoles;
  }

  async findAll() {
    return this.userRoles.findAll();
  }

  async findById(id: string) {
    return this.userRoles.findByPk(id);
  }

  async create(userData: any) {
    return await this.userRoles.create(userData);
  }

  async update(id: string, userData: any) {
    const user = await this.userRoles.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.update(userData);
  }

  async delete(id: string) {
    const user = await this.userRoles.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.update({ deletedAt: new Date() });
  }

  async findByUserId(userId: string) {
    return this.userRoles.findAll({ where: { userId } });
  }
}

export default new UserRolesRepository();
