import express from "express";
import { validarDto } from "../middlewares/validarDto.middleware";
import { UserController } from "../controllers/user.controller";
import { UserDTO } from "../Dto/user/user.dto";
import { upload } from "../middlewares/multer.middleware";
import { UserUpdateDTO } from "../Dto/user/userUpdate.dto";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const controller = new UserController();

const router = express.Router();

router.post("/", validarDto(UserDTO), controller.create);
router.post("/add/Photo/:id", AuthMiddleware, upload.single("capa"), controller.addPhoto);
router.get("/see/data/:id",AuthMiddleware, controller.seeData);
router.patch("/update/:id",AuthMiddleware, validarDto(UserUpdateDTO), controller.update);
router.delete("/delete/:id",AuthMiddleware, controller.delete);

export default router;
