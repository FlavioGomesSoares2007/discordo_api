"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketEvents = void 0;
const socketEvents = (io) => {
    io.on("connection", (socket) => {
        let id = 0;
        socket.on("join", (dados) => {
            id = dados.id;
            socket.join(`user_${id}`);
            console.log(`Usuário ${id} está ONLINE.`);
        });
        socket.on("disconnect", () => {
            if (id) {
                console.log(`Usuário ${id} ficou OFFLINE`);
            }
        });
    });
};
exports.socketEvents = socketEvents;
