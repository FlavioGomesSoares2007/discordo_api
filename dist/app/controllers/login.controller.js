"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../services/login.service");
const service = new login_service_1.LoginService();
class LoginController {
    async login(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;
        try {
            const token = await service.login(email, senha);
            return res.status(200).json(token);
        }
        catch (error) {
            if (error.message === "E-mail ou senha inválidos") {
                return res.status(401).json({ message: "E-mail ou senha inválidos" });
            }
            return res.status(500).json({ message: "error no sistema" });
        }
    }
}
exports.LoginController = LoginController;
