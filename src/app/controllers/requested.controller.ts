import type { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const service = new OrderService();

export class OrderController {
  async create(req: Request, res: Response): Promise<Response> {
    const id = Number(req.user.id);
    const email = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.create(id, email);

      if (response.type === "accept") {
        return res.status(200).json(response.message);
      } else if (response.type === "friends") {
        return res.status(200).json(response.message);
      } else{
        return res.status(200).json(response.message);
      }
    } catch (error: any) {
      if (error.message === "usuário não encontrado") {
        return res.status(404).json({ message: "usuário não encontrado" });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }
}
