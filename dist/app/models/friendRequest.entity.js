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
exports.FriendRequest = void 0;
const typeorm_1 = require("typeorm");
const User_Entity_1 = require("./User.Entity");
let FriendRequest = class FriendRequest {
};
exports.FriendRequest = FriendRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_friend_Request" }),
    __metadata("design:type", Number)
], FriendRequest.prototype, "id_friend_Request", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "id_sender", type: "int", nullable: false }),
    __metadata("design:type", Number)
], FriendRequest.prototype, "id_sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_Entity_1.User, (user) => user.sentRequests),
    (0, typeorm_1.JoinColumn)({ name: "id_sender" }),
    __metadata("design:type", User_Entity_1.User)
], FriendRequest.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "id_recipient", type: "int", nullable: false }),
    __metadata("design:type", Number)
], FriendRequest.prototype, "id_recipient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_Entity_1.User, (user) => user.receivedRequests),
    (0, typeorm_1.JoinColumn)({ name: "id_recipient" }),
    __metadata("design:type", User_Entity_1.User)
], FriendRequest.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", name: "date" }),
    __metadata("design:type", Date)
], FriendRequest.prototype, "date", void 0);
exports.FriendRequest = FriendRequest = __decorate([
    (0, typeorm_1.Entity)("friend_requests")
], FriendRequest);
