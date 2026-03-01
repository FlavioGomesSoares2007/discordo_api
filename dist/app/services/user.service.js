"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const AppDataSource_1 = require("../dataBase/AppDataSource");
const User_Entity_1 = require("../models/User.Entity");
const bcrypt = __importStar(require("bcrypt"));
class UserService {
    constructor() {
        this.userRepositorio = AppDataSource_1.AppDataSource.getRepository(User_Entity_1.User);
    }
    async create(dados) {
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
        const user = this.userRepositorio.create(Object.assign(Object.assign({}, dados), { senha: senhaB }));
        return await this.userRepositorio.save(user);
    }
    async addPhoto(idUser, novaURL) {
        const user = await this.userRepositorio.findOne({
            where: { id_user: idUser },
        });
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        if (user.imagem) {
            const imagem = user.imagem.split("/").slice(-2).join("/").split(".")[0];
            try {
                await cloudinary_1.default.uploader.destroy(imagem);
            }
            catch (error) {
                throw new Error("Não foi possível atualizar a imagem. Tente novamente.");
            }
        }
        user.imagem = novaURL;
        return await this.userRepositorio.save(user);
    }
    async seedata(id_user) {
        const user = await this.userRepositorio.findOne({
            where: { id_user: id_user },
            relations: [
                "friendsAsFirst.user2",
                "friendsAsSecond.user1",
                "receivedRequests.sender",
                "sentRequests.recipient",
            ],
        });
        if (!user)
            throw new Error("Usuário não encontrado");
        const amigosTratados = [
            ...user.friendsAsFirst.map((dados) => ({
                id_amigo: dados.user2.id_user,
                nome: dados.user2.nome,
                imagem: dados.user2.imagem,
            })),
            ...user.friendsAsSecond.map((dados) => ({
                id_amigo: dados.user1.id_user,
                nome: dados.user1.nome,
                imagem: dados.user1.imagem,
            })),
        ];
        const pedidosRecebidos = [
            ...user.receivedRequests.map((dados) => ({
                id_friend_Request: dados.id_friend_Request,
                id_sender: dados.sender.id_user,
                nome: dados.sender.nome,
                imagem: dados.sender.imagem,
            })),
        ];
        const pedidosEnviados = [
            ...user.sentRequests.map((dados) => ({
                id_friend_Request: dados.id_friend_Request,
                id_recipient: dados.recipient.id_user,
                nome: dados.recipient.nome,
                imagem: dados.recipient.imagem,
            })),
        ];
        return Object.assign(Object.assign({}, user), { friends: amigosTratados, sender: pedidosEnviados, recipient: pedidosRecebidos });
    }
    async update(id, dados, novaImg) {
        const user = await this.userRepositorio.findOne({
            where: { id_user: id },
        });
        if (!user) {
            throw new Error("usuário não encontrado");
        }
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }
        this.userRepositorio.merge(user, dados);
        if (novaImg && novaImg !== user.imagem) {
            if (user.imagem) {
                try {
                    const partes = user.imagem.split("/");
                    const publicId = partes.slice(-2).join("/").split(".")[0];
                    await cloudinary_1.default.uploader.destroy(publicId);
                }
                catch (error) {
                    console.error("Erro ao deletar imagem antiga no Cloudinary:", error);
                }
            }
            user.imagem = novaImg;
        }
        return await this.userRepositorio.save(user);
    }
    async delete(id) {
        const user = await this.userRepositorio.findOne({
            where: { id_user: id },
        });
        if (!user) {
            throw new Error("usuário não encontrado");
        }
        const imagem = user.imagem.split("/").slice(-2).join("/").split(".")[0];
        await cloudinary_1.default.uploader.destroy(imagem);
        return await this.userRepositorio.remove(user);
    }
}
exports.UserService = UserService;
