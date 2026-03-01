"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const login_routes_1 = __importDefault(require("./login.routes"));
const request_routes_1 = __importDefault(require("./request.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.use("/user", user_routes_1.default);
routes.use("/login", login_routes_1.default);
routes.use("/request", request_routes_1.default);
routes.use("/message", message_routes_1.default);
exports.default = routes;
