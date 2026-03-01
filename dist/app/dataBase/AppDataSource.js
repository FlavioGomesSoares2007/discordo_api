"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const User_Entity_1 = require("../models/User.Entity");
const friendRequest_entity_1 = require("../models/friendRequest.entity");
const friends_entity_1 = require("../models/friends.entity");
const message_entity_1 = require("../models/message.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_NAME,
    password: process.env.DB_SENHA,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User_Entity_1.User, friendRequest_entity_1.FriendRequest, friends_entity_1.Friends, message_entity_1.Message],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {
            rejectUnauthorized: true,
        },
    },
});
try {
    exports.AppDataSource.initialize();
}
catch (error) {
    console.log(`error ao conectar com o banco de dados ${error}`);
}
