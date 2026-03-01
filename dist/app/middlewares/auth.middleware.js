"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const AuthMiddleware = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acesso negado." });
    }
    jsonwebtoken_1.default.verify(token, process.env.ASSINATURA_JWT, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Acesso negado." });
        }
        req.user = user;
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
