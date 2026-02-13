import { AppDataSource } from "../dataBase/AppDataSource";
import { requestedDto } from "../Dto/order/order.dto";
import { FriendRequest } from "../models/friendRequest.entity";
import { Friends } from "../models/friends.entity";
import { User } from "../models/User.Entity";

export class OrderService {
  private requestedRepositorio = AppDataSource.getRepository(FriendRequest);
  private userRepositorio = AppDataSource.getRepository(User);
  private friendRepositorio = AppDataSource.getRepository(Friends);

  async create(id_sender: number, dados: requestedDto) {
    const user = await this.userRepositorio.findOne({
      where: { nome: dados.nome },
    });

    if (!user) {
      throw new Error("usuário não encontrado");
    }

    const orderSent = await this.requestedRepositorio.findOne({
      where: { id_sender: user.id_user, id_recipient: id_sender },
    });

    if (orderSent) {
      await this.requestedRepositorio.remove(orderSent);
      const friends = await this.friendRepositorio.save({
        id_user_1: user.id_user,
        id_user_2: id_sender,
      });

      return {
        type: "accept",
        message: "Vocês agora são amigos!",
        data: friends,
      };
    }

    const friends1 = await this.friendRepositorio.findOne({
      where: {
        id_user_1: id_sender,
        id_user_2: user.id_user,
      },
    });

    const friends2 = await this.friendRepositorio.findOne({
      where: {
        id_user_1: user.id_user,
        id_user_2: id_sender,
      },
    });

    if (friends1 || friends2) {
      return {
        type: "friends",
        message: "vocês já são amigos!",
      };
    }

    const sentRequest = this.requestedRepositorio.create({
      id_sender: id_sender,
      id_recipient: user.id_user,
    });
    await this.requestedRepositorio.save(sentRequest);
    return {
        type:"send",
        message:"Pedido enviado com sucesso!",
        data:sentRequest
    };
  }
}
