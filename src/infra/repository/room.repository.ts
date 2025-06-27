import { CreateOptions } from "sequelize/types/model";
import Room from "../../models/room";

class RoomRepository {
  public room = Room;

  constructor() {
    this.room = Room;
  }

  async findAll(): Promise<Room[]> {
    return await this.room.findAll();
  }

  async findById(id: string): Promise<Room | null> {
    return await this.room.findByPk(id);
  }

  async create(roomData: any, options: CreateOptions<any>): Promise<Room> {
    return await this.room.create(roomData, options);
  }

  async update(id: string, roomData: any, options: CreateOptions<any>): Promise<Room | null> {
    const room = await this.room.findByPk(id);
    if (!room) {
      throw new Error("Room not found");
    }
    return room.update(roomData, options);
  }

  async findByStatus(status: string): Promise<Room[]> {
    return await this.room.findAll({ where: { status } });
  }
}

export default new RoomRepository();
