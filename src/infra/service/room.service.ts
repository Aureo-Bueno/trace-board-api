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

  async createRoom(roomData: any) {
    try {
      const newRoom = await this.roomRepository.create(roomData);
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
      this.logger.error(`[GetRoomById] Error retrieving room: ${error.message}`);
      throw error;
    }
  }
}

export default new RoomService();
