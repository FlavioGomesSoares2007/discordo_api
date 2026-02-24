import type { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { Friends } from "../models/friends.entity";

const service = new RequestService();

export class RequestController {
  async create(req: Request, res: Response): Promise<Response> {
    const id = Number(req.user.id);
    const nome = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.create(id, nome);
      const io = req.app.get("io");

      if (response.type === "send") {
        io.to(`user_${response.id_sender}`).emit("request_sent", {
          recipient: response.recipient,
        });

        io.to(`user_${response.id_recipient}`).emit("request_sent", {
          sender: response.sender,
        });
      }
      return res.status(200).json(response.message);
    } catch (error: any) {
      if (error.message === "usuário não encontrado") {
        return res.status(404).json({ message: "usuário não encontrado" });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }

  async accept(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.accept(id);
      const io = req.app.get("io");

      io.to(`user_${response.id_user_1}`).emit("newFriend", {
        newFriend: {
          id_user: response.id_user_2,
          nome: response.dataUser2?.nome,
          imagem: response.dataUser2?.imagem,
        },
      });
      io.to(`user_${response.id_user_2}`).emit("newFriend", {
        newFriend: {
          id_user: response.id_user_1,
          nome: response.dataUser1?.nome,
          imagem: response.dataUser1?.imagem,
        },
      });
      return res.status(200).json({ message: "pedido aceito!" });
    } catch (error: any) {
      if (error.message === "Esse pedido não existe") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.delete(id);
      const io = req.app.get("io");

      io.to(`user_${response.sender}`).emit("requestRemoved", {
        id: response.id,
      });
      io.to(`user_${response.recipient}`).emit("requestRemoved", {
        id: response.id,
        id_sender: response.sender,
        id_recipient: response.recipient,
      });

      return res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error: any) {
      if (error.message === "usuário não encontrado") {
        return res.status(404).json({ message: error.message });
      }
    }
    return res.status(500).json({ message: "error no sistema" });
  }
}
