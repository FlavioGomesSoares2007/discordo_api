import cloudinary from "../config/cloudinary";
import { AppDataSource } from "../dataBase/AppDataSource";
import { UserDTO } from "../Dto/user/user.dto";
import { UserUpdateDTO } from "../Dto/user/userUpdate.dto";
import { User } from "../models/User.Entity";
import * as bcrypt from "bcrypt";

export class UserService {
  private userRepositorio = AppDataSource.getRepository(User);

  async create(dados: UserDTO) {
    const email = await this.userRepositorio.findOne({
      where: {
        email: dados.email,
      },
    });

    if (email) {
      throw new Error("esse email já estar em uso");
    }
    const nome = await this.userRepositorio.findOne({
      where: {
        nome: dados.nome,
      },
    });

    if (nome) {
      throw new Error("esse nome já estar em uso");
    }
    const senhaB = await bcrypt.hash(dados.senha, 10);

    const user = this.userRepositorio.create({
      ...dados,
      senha: senhaB,
    });

    return await this.userRepositorio.save(user);
  }

  async addPhoto(idUser: number, novaURL: string) {
    const user = await this.userRepositorio.findOne({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (user.imagem) {
      const imagem = user.imagem.split("/").slice(-2).join("/").split(".")[0];
      try {
        await cloudinary.uploader.destroy(imagem);
      } catch (error) {
        throw new Error(
          "Não foi possível atualizar a imagem. Tente novamente.",
        );
      }
    }

    user.imagem = novaURL;
    return await this.userRepositorio.save(user);
  }

  async seedata(id_user: number): Promise<User> {
    const user = await this.userRepositorio.findOne({
      where: { id_user: id_user },
    });

    if (!user) {
      throw new Error("usuário não encontrado");
    }

    return user;
  }

  async update(id: number, dados: UserUpdateDTO): Promise<User> {
    const user = await this.userRepositorio.findOne({
      where: { id_user: id },
    });
    if (!user) {
      throw new Error("usuário não encontrado");
    }
    this.userRepositorio.merge(user, dados);

    if (dados.senha) {
      user.senha = await bcrypt.hash(dados.senha, 10);
    }
    return await this.userRepositorio.save(user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepositorio.findOne({
      where: { id_user: id },
    });
    if (!user) {
      throw new Error("usuário não encontrado");
    }
    const imagem = user.imagem.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(imagem);
    return await this.userRepositorio.remove(user);
  }
}
