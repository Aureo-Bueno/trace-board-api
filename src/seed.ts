import User from "./models/user";
import Role from "./models/roles";
import logger from "./config/logger";
import bcrypt from "bcrypt";
import UserRoles from "./models/userRoles";
import Schedule from "./models/schedule";
import Room from "./models/room";
import Address from "./models/address";

export async function seedDatabase() {
  try {
    await Address.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
    await Role.destroy({ where: {}, force: true });
    await UserRoles.destroy({ where: {}, force: true });
    await Schedule.destroy({ where: {}, force: true });
    await Room.destroy({ where: {}, force: true });
    await Address.destroy({ where: {}, force: true });
    await Role.bulkCreate([{ name: "admin" }, { name: "client" }], {
      ignoreDuplicates: true,
    });

    const [adminUser, adminUserCreated] = await User.findOrCreate({
      where: { email: "aureoalexandre+admin@outlook.com" },
      defaults: {
        name: "Aureo",
        lastName: "Bueno Admin",
        password: await bcrypt.hash("admin123", 10),
      },
    });

    const [clientUser, clientUserCreated] = await User.findOrCreate({
      where: { email: "aureoalexandre+cliente@outlook.com" },
      defaults: {
        name: "Aureo",
        lastName: "Bueno Cliente",
        password: await bcrypt.hash("user123", 10),
      },
    });

    const [adminRole] = await Role.findOrCreate({
      where: { name: "admin" },
    });

    const [clientRole] = await Role.findOrCreate({
      where: { name: "client" },
    });

    await Address.findOrCreate({
      where: {
        userId: adminUser?.id,
        street: "123 Admin St",
        city: "Admin City",
        state: "Admin State",
        zipCode: "12345",
        number: "1",
        neighborhood: "Admin Neighborhood",
      },
      defaults: {
        complement: "Suite 100",
      },
    });
    await Address.findOrCreate({
      where: {
        userId: clientUser?.id,
        street: "123 Client St",
        city: "Client City",
        state: "Client State",
        zipCode: "12345",
      },
      defaults: {
        number: "1",
        complement: "Suite 100",
        neighborhood: "Admin Neighborhood",
      },
    });

    if (adminUser || adminRole) {
      await UserRoles.bulkCreate(
        [
          { userId: adminUser?.id, roleId: adminRole.id },
          { userId: clientUser?.id, roleId: clientRole.id },
        ],
        { ignoreDuplicates: true }
      );
    }

    const rooms = await Room.bulkCreate(
      [
        { name: "Room 01", capacity: 10, status: "available" },
        { name: "Room 02", capacity: 20, status: "available" },
        { name: "Room 03", capacity: 30, status: "occupied" },
        { name: "Room 04", capacity: 40, status: "available" },
        { name: "Room 05", capacity: 50, status: "available" },
        { name: "Room 06", capacity: 60, status: "occupied" },
        { name: "Room 07", capacity: 70, status: "available" },
        { name: "Room 08", capacity: 80, status: "occupied" },
        { name: "Room 09", capacity: 90, status: "available" },
        { name: "Room 10", capacity: 100, status: "maintenance" },
      ],
      { ignoreDuplicates: true }
    );

    if (!rooms || rooms.length < 3) {
      logger.error("[SeedDatabase] Not enough rooms created");
      return;
    }

    logger.info("[SeedDatabase] Schedule seed values", {
      userId: adminUser.id,
      roomIds: rooms.map((r) => r.id),
    });
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
        },
      ],
      { ignoreDuplicates: true }
    );

    logger.info("[SeedDatabase] Database seeded successfully");
  } catch (error: any) {
    logger.error("[SeedDatabase] Error seeding database:", error);
    logger.error(`[SeedDatabase] Error name: ${error?.name}`);
    logger.error(`[SeedDatabase] Error message: ${error?.message}`);
    logger.error(`[SeedDatabase] Error stack: ${error?.stack}`);
    if (error && typeof error === "object") {
      for (const key of Object.keys(error)) {
        logger.error(`[SeedDatabase] Error property [${key}]:`, error[key]);
      }
    }
    if (
      error &&
      error.name === "SequelizeValidationError" &&
      Array.isArray(error.errors)
    ) {
      for (const err of error.errors) {
        logger.error(`[SeedDatabase] Validation error: ${err.message}`);
      }
    }
  }
}
