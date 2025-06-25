import userService from "./user.service";
import userRolesService from "./userRoles.service";
import roleService from "./role.service";

class MeService {
  public userService: typeof userService;
  public userRolesService: typeof userRolesService;
  public roleService: typeof roleService;
  constructor() {
    this.userService = userService;
    this.userRolesService = userRolesService;
    this.roleService = roleService;
  }

  async me(user: any) {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userData = await this.userService.getUserById(user.id);
    if (!userData) {
      throw new Error("User not found");
    }

    const userRoles = await this.userRolesService.getUserRoleById(user.id);

    if (!userRoles) {
      throw new Error("User roles not found");
    }

    const roles = await Promise.all(
      userRoles.map(async (userRole: any) => {
        const role = await this.roleService.getRoleById(userRole.roleId);
        return role ? { id: role.id, name: role.name } : null;
      })
    );

    return {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
      },
      roles: roles,
      isAdmin: roles.some((role) => role?.name === "admin"),
      isUser: roles.some((role) => role?.name === "user"),
    };
  }
}

export default new MeService();
