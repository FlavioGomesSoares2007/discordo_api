import { AppDataSource } from "../dataBase/AppDataSource";
import { User } from "../models/User.Entity";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class LoginService {
  private userRepositorio = AppDataSource.getRepository(User);

  async login(email: string, senha: string):Promise<string> {
    const user = await this.userRepositorio.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("E-mail ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("E-mail ou senha inválidos");
    }
    const token = jwt.sign(
      { id: user.id_user, email: user.email },
      process.env.ASSINATURA_JWT!,
      { expiresIn: "24h" },
    );

    return token
  }
}
