"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const index_routes_1 = __importDefault(require("./app/routes/index.routes"));
const socketEvents_controller_1 = require("./app/controllers/socketEvents.controller");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT_WEB;
app.use((0, cors_1.default)({
    origin: "https://discordo-cliente.onrender.com",
    methods: ["GET", "POST", "DELETE", "PATCH"],
}));
app.use(express_1.default.json());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://discordo-cliente.onrender.com",
        methods: ["GET", "POST", "DELETE", "PATCH"],
    },
});
app.set("io", io);
app.use(index_routes_1.default);
(0, socketEvents_controller_1.socketEvents)(io);
server.listen(port, () => {
    console.log(`Discordo no ar 🚀   http://localhost:${port}`);
});
