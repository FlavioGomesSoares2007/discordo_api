import express from "express";
import { MessageController } from "../controllers/message.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validarDto } from "../middlewares/validarDto.middleware";
import { MessageDto } from "../Dto/message/message.dto";

const router = express.Router()
const controller = new MessageController()

router.post("/:id", AuthMiddleware, validarDto(MessageDto), controller.create)

export default router