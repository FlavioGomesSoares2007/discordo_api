import express from "express"
import { OrderController } from "../controllers/requested.controller"
import { AuthMiddleware } from "../middlewares/auth.middleware"

const routes = express.Router()
const controller = new OrderController()

routes.post("/", AuthMiddleware ,controller.create)

export default routes