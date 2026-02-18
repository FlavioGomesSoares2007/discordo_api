import { AppDataSource } from "../dataBase/AppDataSource";
import { RequestdDto } from "../Dto/request/request.dto";
import { FriendRequest } from "../models/friendRequest.entity";
import { Friends } from "../models/friends.entity";
import { User } from "../models/User.Entity";

export class RequestService {
  private requestRepositorio = AppDataSource.getRepository(FriendRequest);
  private userRepositorio = AppDataSource.getRepository(User);
  private friendRepositorio = AppDataSource.getRepository(Friends);

  async create(id_sender: number, dados: RequestdDto) {
    const user = await this.userRepositorio.findOne({
      where: { nome: dados.nome },
    });

    if (!user) {
      throw new Error("usuário não encontrado");
    }

    if (id_sender === user.id_user) {
      return {
        type: "error",
        message: "você não pode mandar um convite para si mesmo",
      };
    }

    const sendRequest = await this.requestRepositorio.findOne({
      where: { id_sender: id_sender, id_recipient: user.id_user },
    });

    if (sendRequest) {
      return {
        type: "send_request",
        message: "Você já mandou um convite!",
        sender:id_sender
      };
    }

    const orderSent = await this.requestRepositorio.findOne({
      where: { id_sender: user.id_user, id_recipient: id_sender },
    });

    if (orderSent) {
      await this.requestRepositorio.remove(orderSent);
      const friends = await this.friendRepositorio.save({
        id_user_1: user.id_user,
        id_user_2: id_sender,
      });

      return {
        type: "accept",
        message: "Vocês agora são amigos!",
        data: friends,
        sender:id_sender,
        recipient:user.id_user
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
        friends: friends1 || friends2,
        sender: id_sender
      };
    }

    const sentRequest = this.requestRepositorio.create({
      id_sender: id_sender,
      id_recipient: user.id_user,
    });
    await this.requestRepositorio.save(sentRequest);
    return {
      type: "send",
      message: "Pedido enviado com sucesso!",
      data: sentRequest,
      sender:sentRequest.id_sender,
      recipient: sentRequest.id_recipient

    };
  }

  async accept(id_order: number) {
    const order = await this.requestRepositorio.findOne({
      where: { id_friend_Request: id_order },
    });
    if (!order) {
      throw new Error("Esse pedido não existe");
    }

    const friends = this.friendRepositorio.create({
      id_user_1: order.id_sender,
      id_user_2: order.id_recipient,
    });
    const user1 = await this.userRepositorio.findOne({
      where: { id_user: order.id_sender },
    });

    const user2 = await this.userRepositorio.findOne({
      where: { id_user: order.id_recipient },
    });

    await this.requestRepositorio.remove(order);
    await this.friendRepositorio.save(friends);
    return {
      id_user_1: order.id_sender,
      id_user_2: order.id_recipient,
      dataUser1: user1,
      dataUser2: user2,
    };
  }

  async delete(id: number) {
  const request = await this.requestRepositorio.findOne({
    where: { id_friend_Request: id },
  });

  if (!request) {
    throw new Error("pedido não encontrado");
  }

  const idDeletado = request.id_friend_Request;
  const idSender = request.id_sender;
  const idRecipient = request.id_recipient;

  await this.requestRepositorio.remove(request);

  return {
    id: idDeletado,
    sender: idSender,
    recipient: idRecipient
  };
}
}
