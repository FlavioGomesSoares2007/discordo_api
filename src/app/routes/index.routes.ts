import user from "./user.routes";
import login from "./login.routes";
import request from "./request.routes";
import message from "./message.routes";

import express from "express";

const routes = express.Router();

routes.use("/user", user);
routes.use("/login", login);
routes.use("/request", request);
routes.use("/message", message);

export default routes;
