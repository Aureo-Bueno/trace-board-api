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

  async create(roomData: any): Promise<Room> {
    return await this.room.create(roomData);
  }

  async update(id: string, roomData: any): Promise<Room | null> {
    const room = await this.room.findByPk(id);
    if (!room) {
      throw new Error("Room not found");
    }
    return room.update(roomData);
  }
}

export default new RoomRepository();
