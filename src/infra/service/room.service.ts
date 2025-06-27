import logger from "../../config/logger";
import roomRepository from "../repository/room.repository";

class RoomService {
  private logger = logger;
  private roomRepository: typeof roomRepository;

  constructor() {
    this.logger = logger;
    this.roomRepository = roomRepository;
  }

  async getRooms() {
    try {
      const rooms = await this.roomRepository.findAll();
      this.logger.info(`[GetRooms] Retrieved ${rooms.length} rooms`);
      return rooms;
    } catch (error: any) {
      this.logger.error(`[GetRooms] Error retrieving rooms: ${error.message}`);
      throw error;
    }
  }

  async createRoom(roomData: any, userId?: string) {
    try {
      const newRoom = await this.roomRepository.create(roomData, { context: { userId } } as any);
      this.logger.info(`[CreateRoom] Created room with ID: ${newRoom.id}`);
      return newRoom;
    } catch (error: any) {
      this.logger.error(`[CreateRoom] Error creating room: ${error.message}`);
      throw error;
    }
  }

  async getRoomById(roomId: string) {
    try {
      const room = await this.roomRepository.findById(roomId);
      if (!room) {
        this.logger.warn(`[GetRoomById] Room not found with ID: ${roomId}`);
        return null;
      }
      this.logger.info(`[GetRoomById] Found room with ID: ${room.id}`);
      return room;
    } catch (error: any) {
      this.logger.error(
        `[GetRoomById] Error retrieving room: ${error.message}`
      );
      throw error;
    }
  }

  async getRoomsAvailable(): Promise<{ id: string; name: string }[]> {
    try {
      const rooms = await this.roomRepository.findByStatus("available");
      if (!rooms || (Array.isArray(rooms) && rooms.length === 0)) {
        this.logger.warn("[GetRoomsAvailable] No available rooms found");
        return [];
      }
      this.logger.info(
        `[GetRoomsAvailable] Found ${rooms.length} available rooms`
      );
      return rooms.map((room) => ({
        id: room.id,
        name: room.name,
      }));
    } catch (error: any) {
      this.logger.error(
        `[GetRoomsAvailable] Error retrieving available rooms: ${error.message}`
      );
      throw error;
    }
  }

  async updateRoomStatus(roomId: string, status: string, userId?: string) {
    try {
      await this.roomRepository.update(roomId, { status }, { context: { userId } } as any);
      this.logger.info(`[UpdateRoomStatus] Updated room with ID: ${roomId} to status: ${status}`);
    } catch (error: any) {
      this.logger.error(`[UpdateRoomStatus] Error updating room status: ${error.message}`);
      throw error;
    }
  }
}

export default new RoomService();
