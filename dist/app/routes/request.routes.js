"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validarDto_middleware_1 = require("../middlewares/validarDto.middleware");
const request_dto_1 = require("../Dto/request/request.dto");
const routes = express_1.default.Router();
const controller = new request_controller_1.RequestController();
routes.post("/", auth_middleware_1.AuthMiddleware, (0, validarDto_middleware_1.validarDto)(request_dto_1.RequestdDto), controller.create);
routes.post("/accept/:id", auth_middleware_1.AuthMiddleware, controller.accept);
routes.delete("/delete/:id", auth_middleware_1.AuthMiddleware, controller.delete);
exports.default = routes;
