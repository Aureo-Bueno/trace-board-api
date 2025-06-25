import User from "../../models/user";

/**
 * UserRepository class for managing user data
 * This class provides methods to interact with the User model,
 * including finding, creating, updating, and deleting users.
 * It uses Sequelize ORM for database operations.
 */
class UserRepository {
  public user = User;

  constructor() {
    this.user = User;
  }

  async findAll() {
    return this.user.findAll();
  }

  async findById(id: string) {
    return this.user.findByPk(id);
  }

  async create(userData: any) {
    return this.user.create(userData);
  }

  async update(id: string, userData: any) {
    const user = await this.user.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.update(userData);
  }

  async delete(id: string) {
    const user = await this.user.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user.update({ deletedAt: new Date() });
  }

  async findByEmail(email: string) {
    return this.user.findOne({ where: { email } });
  }
}

export default new UserRepository();
