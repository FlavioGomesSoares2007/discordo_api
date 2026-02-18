import user from "./user.routes"
import login from "./login.routes"
import request from "./request.routes"

import express from "express"
 
const routes = express.Router()

routes.use("/user", user)
routes.use("/login", login)
routes.use("/request", request)


export default routes