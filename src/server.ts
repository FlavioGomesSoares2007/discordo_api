import "dotenv/config";
import express from "express";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";
import routes from "./app/routes/index.routes";
import { socketEvents } from "./app/controllers/socketEvents.controller";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT_WEB;

app.use(
  cors({
    origin: "https://discordo-cliente.vercel.app",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  }),
);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "https://discordo-cliente.vercel.app",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  },
});

app.set("io", io);
app.use(routes);

socketEvents(io);

server.listen(port, () => {
  console.log(`Discordo no ar 🚀   http://localhost:${port}`);
});
