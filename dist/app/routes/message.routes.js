"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validarDto_middleware_1 = require("../middlewares/validarDto.middleware");
const message_dto_1 = require("../Dto/message/message.dto");
const router = express_1.default.Router();
const controller = new message_controller_1.MessageController();
router.post("/:id", auth_middleware_1.AuthMiddleware, (0, validarDto_middleware_1.validarDto)(message_dto_1.MessageDto), controller.create);
router.get("/", auth_middleware_1.AuthMiddleware, controller.searchMessages);
exports.default = router;
