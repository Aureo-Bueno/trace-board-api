import User from "./models/user";
import Role from "./models/roles";
import logger from "./config/logger";
import bcrypt from "bcrypt";
import UserRoles from "./models/userRoles";
import Schedule from "./models/schedule";
import Room from "./models/room";

export async function seedDatabase() {
  try {
    await Role.bulkCreate([{ name: "admin" }, { name: "user" }], {
      ignoreDuplicates: true,
    });

    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
    });

    const adminUser = await User.findOne({
      where: { email: "admin@example.com" },
    });
    const adminRole = await Role.findOne({ where: { name: "admin" } });

    if (adminUser || adminRole) {
      await UserRoles.bulkCreate(
        [{ userId: adminUser?.id, roleId: adminRole?.id }],
        { ignoreDuplicates: true }
      );
    }

    const rooms = await Room.bulkCreate(
      [
        { name: "Room A", capacity: 10 },
        { name: "Room B", capacity: 20 },
        { name: "Room C", capacity: 30 },
      ],
      { ignoreDuplicates: true }
    );

    await Schedule.bulkCreate(
      [
        {
          userId: adminUser?.id,
          roomId: rooms[0].id,
          status: "pending",
          startTime: new Date(),
        },
        {
          userId: adminUser?.id,
          roomId: rooms[1].id,
          status: "pending",
          startTime: new Date(new Date().getTime() + 3600000), // 1 hour later
        },
        {
          userId: adminUser?.id,
          roomId: rooms[2].id,
          status: "cancelled",
          startTime: new Date(new Date().getTime() + 7200000), // 2 hours later
        }
      ],
      { ignoreDuplicates: true }
    );

    logger.info("[SeedDatabase] Database seeded successfully");
  } catch (error) {
    logger.error("[SeedDatabase] Error seeding database:", error);
  }
}
