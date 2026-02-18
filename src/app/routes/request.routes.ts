import express from "express";
import { RequestController } from "../controllers/request.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validarDto } from "../middlewares/validarDto.middleware";
import { RequestdDto } from "../Dto/request/request.dto";

const routes = express.Router();
const controller = new RequestController();

routes.post("/", AuthMiddleware, validarDto(RequestdDto), controller.create);
routes.post("/accept/:id", AuthMiddleware, controller.accept);
routes.delete("/delete/:id", AuthMiddleware, controller.delete)

export default routes;
