import { UserService } from "../services/user.service";
import type { Request, Response } from "express";

const service = new UserService();

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "esse email ja estar em uso") {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: "erro no sistema" });
    }
  }

  async addPhoto(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const file = req.file?.path;

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (!file) {
      return res.status(400).json({ message: "arquivo nao encontrado" });
    }

    try {
      const updatedUser = await service.addPhoto(id, file);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ message: error.message });
      }
      if (
        error.message ===
        "Não foi possível atualizar a imagem. Tente novamente."
      ) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "erro no sistema" });
    }
  }

  async seeData(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const user = await service.seedata(id);
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "usuario não encontrado") {
        return res.status(404).json({ message: "usuario não encontrado" });
      }
      return res.status(500).json({ message: "erro no sistema" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const dados = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const response = await service.update(id, dados);
      return res.status(200).json(response);
    } catch (error: any) {
      if (error.message === "usuario não encontrado") {
        return res.status(404).json({ message: "usuario não encontrado" });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const dados = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    try {
      const user = await service.delete(id);
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "usuario não encontrado") {
        return res.status(404).json({ message: "usuario não encontrado" });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }
}
