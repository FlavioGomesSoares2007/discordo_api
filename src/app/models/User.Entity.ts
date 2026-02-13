import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FriendRequest } from "./friendRequest.entity";
import { Friends } from "./friends.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ name: "id_user" })
  id_user!: number;

  @Column({
    name: "nome",
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  nome!: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 200,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    name: "senha",
    type: "varchar",
    length: 200,
    nullable: false,
  })
  senha!: string;

  @Column({
    name: "imagem",
    type: "varchar",
    length: 200,
    nullable: true,
  })
  imagem!: string;

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentRequests!: FriendRequest;

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.recipient)
  receivedRequests!: FriendRequest;

  @OneToMany(() => Friends, (friends) => friends.user1)
  friendsAsFirst!: Friends[];
  
  @OneToMany(() => Friends, (friendship) => friendship.user2)
  friendsAsSecond!: Friends[];
}
