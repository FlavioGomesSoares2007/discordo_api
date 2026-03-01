"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const service = new user_service_1.UserService();
class UserController {
    async create(req, res) {
        try {
            const user = await service.create(req.body);
            return res.status(201).json(user);
        }
        catch (error) {
            if (error.message === "esse email já estar em uso") {
                return res.status(409).json({ message: "esse email já estar em uso" });
            }
            if (error.message === "esse nome já estar em uso") {
                return res.status(409).json({ message: "esse nome já estar em uso" });
            }
            return res.status(500).json({ message: "erro no sistema" });
        }
    }
    async addPhoto(req, res) {
        var _a;
        const id = Number(req.user.id);
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }
        if (!file) {
            return res.status(400).json({ message: "arquivo nao encontrado" });
        }
        try {
            const updatedUser = await service.addPhoto(id, file);
            const io = req.app.get("io");
            const { senha } = updatedUser, resto = __rest(updatedUser, ["senha"]);
            io.emit("update", resto);
            return res.status(200).json(resto);
        }
        catch (error) {
            if (error.message === "Usuário não encontrado.") {
                return res.status(404).json({ message: error.message });
            }
            if (error.message ===
                "Não foi possível atualizar a imagem. Tente novamente.") {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "erro no sistema" });
        }
    }
    async seeData(req, res) {
        const id = Number(req.user.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const user = await service.seedata(id);
            const { friendsAsFirst, friendsAsSecond, receivedRequests, sentRequests } = user, userDate = __rest(user, ["friendsAsFirst", "friendsAsSecond", "receivedRequests", "sentRequests"]);
            return res.status(200).json(Object.assign({}, userDate));
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: "usuário não encontrado" });
            }
            return res.status(500).json({ message: "erro no sistema" });
        }
    }
    async update(req, res) {
        var _a;
        const id = Number(req.user.id);
        const dados = req.body;
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const response = await service.update(id, dados, file);
            const io = req.app.get("io");
            io.emit("update", response);
            return res.status(200).json(response);
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: "usuário não encontrado" });
            }
            console.error(error);
            return res.status(500).json({ message: "erro no sistema" });
        }
    }
    async delete(req, res) {
        const id = Number(req.user.id);
        const dados = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalido" });
        }
        try {
            const user = await service.delete(id);
            return res.status(200).json(user);
        }
        catch (error) {
            if (error.message === "usuário não encontrado") {
                return res.status(404).json({ message: "usuário não encontrado" });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
}
exports.UserController = UserController;
