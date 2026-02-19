import { AppDataSource } from "../dataBase/AppDataSource";
import { MessageDto } from "../Dto/message/message.dto";
import { Message } from "../models/message.entity";
import { User } from "../models/User.Entity";

export class messageService {
  private messageRepositorio = AppDataSource.getRepository(Message);
  private userRepositorio = AppDataSource.getRepository(User);
  async create(id_sender: number, id_recipient:number, dados: MessageDto) {
    const user = await this.userRepositorio.findOne({
      where: { id_user: id_recipient },
    });

    if (!user) {
      throw new Error("usuário não encontrado");
    }

    return await this.messageRepositorio.save({
        id_sender:id_sender,
        id_recipient:id_recipient,
        message:dados.message
    });
  }
}
