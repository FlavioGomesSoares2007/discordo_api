"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const AppDataSource_1 = require("../dataBase/AppDataSource");
const message_entity_1 = require("../models/message.entity");
const User_Entity_1 = require("../models/User.Entity");
class messageService {
    constructor() {
        this.messageRepositorio = AppDataSource_1.AppDataSource.getRepository(message_entity_1.Message);
        this.userRepositorio = AppDataSource_1.AppDataSource.getRepository(User_Entity_1.User);
    }
    async create(id_sender, id_recipient, dados) {
        const user = await this.userRepositorio.findOne({
            where: { id_user: id_recipient },
        });
        if (!user) {
            throw new Error("usuário não encontrado");
        }
        return await this.messageRepositorio.save({
            id_sender: id_sender,
            id_recipient: id_recipient,
            message: dados.message,
        });
    }
    async searchMessages(id_sender) {
        const user = await this.userRepositorio.find({
            where: { id_user: id_sender },
        });
        if (!user) {
            throw new Error("usuário não encontrado");
        }
        return await this.messageRepositorio.find({
            where: [{ id_sender: id_sender }, { id_recipient: id_sender }],
            order: {
                data: "ASC"
            }
        });
    }
}
exports.messageService = messageService;
