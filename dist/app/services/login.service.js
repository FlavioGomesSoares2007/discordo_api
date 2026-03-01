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
exports.LoginService = void 0;
const AppDataSource_1 = require("../dataBase/AppDataSource");
const User_Entity_1 = require("../models/User.Entity");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class LoginService {
    constructor() {
        this.userRepositorio = AppDataSource_1.AppDataSource.getRepository(User_Entity_1.User);
    }
    async login(email, senha) {
        const user = await this.userRepositorio.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("E-mail ou senha inválidos");
        }
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            throw new Error("E-mail ou senha inválidos");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id_user, email: user.email }, process.env.ASSINATURA_JWT, { expiresIn: "24h" });
        return token;
    }
}
exports.LoginService = LoginService;
