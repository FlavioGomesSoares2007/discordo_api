import type { Request, Response } from "express";
import { LoginService } from "../services/login.service";

const service = new LoginService();

export class LoginController {
  async login(req: Request, res: Response): Promise<Response> {
    const email = req.body.email;
    const senha = req.body.senha;
    try {
      const token = await service.login(email, senha);
      return res.status(200).json(token);
    } catch (error: any) {
      if (error.message === "E-mail ou senha inválidos") {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }
      return res.status(500).json({ message: "error no sistema" });
    }
  }
}
