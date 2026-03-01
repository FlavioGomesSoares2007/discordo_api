"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const friendRequest_entity_1 = require("./friendRequest.entity");
const friends_entity_1 = require("./friends.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_user" }),
    __metadata("design:type", Number)
], User.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "nome",
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "email",
        type: "varchar",
        length: 200,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "senha",
        type: "varchar",
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "imagem",
        type: "varchar",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "imagem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendRequest_entity_1.FriendRequest, (friendRequest) => friendRequest.sender),
    __metadata("design:type", Array)
], User.prototype, "sentRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendRequest_entity_1.FriendRequest, (friendRequest) => friendRequest.recipient),
    __metadata("design:type", Array)
], User.prototype, "receivedRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friends_entity_1.Friends, (friends) => friends.user1),
    __metadata("design:type", Array)
], User.prototype, "friendsAsFirst", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friends_entity_1.Friends, (friendship) => friendship.user2),
    __metadata("design:type", Array)
], User.prototype, "friendsAsSecond", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
