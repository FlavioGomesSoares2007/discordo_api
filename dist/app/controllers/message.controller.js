"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_service_1 = require("../services/message.service");
const service = new message_service_1.messageService();
class MessageController {
    async create(req, res) {
        const id_sender = Number(req.user.id);
        const id_recipient = Number(req.params.id);
        if (isNaN(id_sender)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        if (isNaN(id_recipient)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.create(id_sender, id_recipient, req.body);
            const io = req.app.get("io");
            io.to(`user_${id_sender}`).emit("new_message", response);
            io.to(`user_${id_recipient}`).emit("new_message", response);
            return res.status(200).json(response);
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
    async searchMessages(req, res) {
        const id_sender = Number(req.user.id);
        if (isNaN(id_sender)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.searchMessages(id_sender);
            return res.status(200).json(response);
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
}
exports.MessageController = MessageController;
