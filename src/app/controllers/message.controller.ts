import type { Request, Response } from "express";
import { messageService } from "../services/message.service";

const service = new messageService();
export class MessageController {
  async create(req: Request, res: Response): Promise<Response> {
    const id_sender = Number(req.user.id);
    const id_recipient = Number(req.params.id);
    if (isNaN(id_sender)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    if (isNaN(id_recipient)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.create(id_sender, id_recipient, req.body);
      const io = req.app.get("io");

      io.to(`user_${id_sender}`).emit("new_message", response);
      io.to(`user_${id_recipient}`).emit("new_message", response);

      return res.status(200).json(response);
    } catch (error: any) {
      if (error.message === "usuário não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }
}
