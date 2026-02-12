import express from "express";
import { LoginController } from "../controllers/login.controller";

const Router = express.Router()
const controller = new LoginController()

Router.post("/", controller.login)

export default Router
