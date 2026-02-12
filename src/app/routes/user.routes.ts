import express from "express";
import { validarDto } from "../middlewares/validarDto.middleware";
import { UserController } from "../controllers/user.controller";
import { UserDTO } from "../Dto/user/user.dto";
import { upload } from "../middlewares/multer.middleware";
import { UserUpdateDTO } from "../Dto/user/userUpdate.dto";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const controller = new UserController();

const Router = express.Router();

Router.post("/", validarDto(UserDTO), controller.create);
Router.post("/add/Photo/:id", AuthMiddleware, upload.single("capa"), controller.addPhoto);
Router.get("/see/data/:id",AuthMiddleware, controller.seeData);
Router.patch("/update/:id",AuthMiddleware, validarDto(UserUpdateDTO), controller.update);
Router.delete("/delete/:id",AuthMiddleware, controller.delete);

export default Router;
