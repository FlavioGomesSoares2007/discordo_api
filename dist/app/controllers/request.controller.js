"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const request_service_1 = require("../services/request.service");
const service = new request_service_1.RequestService();
class RequestController {
    async create(req, res) {
        const id = Number(req.user.id);
        const nome = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.create(id, nome);
            const io = req.app.get("io");
            if (response.type === "send") {
                io.to(`user_${response.id_sender}`).emit("request_sent", {
                    recipient: response.recipient,
                });
                io.to(`user_${response.id_recipient}`).emit("request_sent", {
                    sender: response.sender,
                });
            }
            return res.status(200).json(response.message);
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: "usuário não encontrado" });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
    async accept(req, res) {
        var _a, _b, _c, _d;
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.accept(id);
            const io = req.app.get("io");
            io.to(`user_${response.id_user_1}`).emit("newFriend", {
                newFriend: {
                    id_user: response.id_user_2,
                    nome: (_a = response.dataUser2) === null || _a === void 0 ? void 0 : _a.nome,
                    imagem: (_b = response.dataUser2) === null || _b === void 0 ? void 0 : _b.imagem,
                },
            });
            io.to(`user_${response.id_user_2}`).emit("newFriend", {
                newFriend: {
                    id_user: response.id_user_1,
                    nome: (_c = response.dataUser1) === null || _c === void 0 ? void 0 : _c.nome,
                    imagem: (_d = response.dataUser1) === null || _d === void 0 ? void 0 : _d.imagem,
                },
            });
            return res.status(200).json({ message: "pedido aceito!" });
        }
        catch (error) {
            if (error.message === "Esse pedido não existe") {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.delete(id);
            const io = req.app.get("io");
            io.to(`user_${response.sender}`).emit("requestRemoved", {
                id: response.id,
            });
            io.to(`user_${response.recipient}`).emit("requestRemoved", {
                id: response.id,
                id_sender: response.sender,
                id_recipient: response.recipient,
            });
            return res.status(200).json({ message: "Pedido removido com sucesso" });
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: error.message });
            }
        }
        return res.status(500).json({ message: "error no sistema" });
    }
}
exports.RequestController = RequestController;
