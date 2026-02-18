import { Server, Socket } from "socket.io";

export const socketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    let id = 0
    socket.on("join", (dados: any) => {
      id = dados.id
      socket.join(`user_${id}`);
      console.log(
        `Usuário ${id} está ONLINE.`,
      );
    });

    socket.on("disconnect", () => {
      if (id) {
        console.log(`Usuário ${id} ficou OFFLINE`);
      }
    });
  });
};
