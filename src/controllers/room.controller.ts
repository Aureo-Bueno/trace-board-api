import { Request, Response } from "express";
import roomService from "../infra/service/room.service";

class RoomController {
  public roomService: typeof roomService;
  constructor() {
    this.roomService = roomService;
  }
  getRooms = async (req: Request, res: Response) => {
    const rooms = await this.roomService.getRooms();
    if (!rooms || (Array.isArray(rooms) && rooms.length === 0)) {
      return res.status(404).json({ message: "No rooms found" });
    }
    return res.status(200).json(rooms);
  };

  createRoom = async (req: Request, res: Response) => {
    try {
      const newRoom = await this.roomService.createRoom(req.body, req.user?.id ?? undefined);
      return res.status(201).json(newRoom);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getRoomsAvailable = async (req: Request, res: Response) => {
    const rooms = await this.roomService.getRoomsAvailable();
    if (!rooms || (Array.isArray(rooms) && rooms.length === 0)) {
      return res.status(404).json({ message: "No available rooms found" });
    }
    return res.status(200).json(rooms);
  };
}

export default new RoomController();
