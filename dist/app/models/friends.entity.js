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
exports.Friends = void 0;
const typeorm_1 = require("typeorm");
const User_Entity_1 = require("./User.Entity");
let Friends = class Friends {
};
exports.Friends = Friends;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_friends" }),
    __metadata("design:type", Number)
], Friends.prototype, "id_friends", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "id_user_1" }),
    __metadata("design:type", Number)
], Friends.prototype, "id_user_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "id_user_2" }),
    __metadata("design:type", Number)
], Friends.prototype, "id_user_2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_Entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "id_user_1" }),
    __metadata("design:type", User_Entity_1.User)
], Friends.prototype, "user1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_Entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "id_user_2" }),
    __metadata("design:type", User_Entity_1.User)
], Friends.prototype, "user2", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "date" }),
    __metadata("design:type", Date)
], Friends.prototype, "date", void 0);
exports.Friends = Friends = __decorate([
    (0, typeorm_1.Entity)("friends")
], Friends);
