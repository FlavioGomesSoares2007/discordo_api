import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.Entity";

@Entity("friend_requests")
export class FriendRequest {
  @PrimaryGeneratedColumn({ name: "id_friend_Request" })
  id_friend_Request!: number;

  @Column({ name: "id_sender", type: "int", nullable: false })
  id_sender!: number;

  @ManyToOne(() => User, (user) => user.sentRequests)
  @JoinColumn({ name: "id_sender" })
  sender!: User;

  @Column({ name: "id_recipient", type: "int", nullable: false })
  id_recipient!: number;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  @JoinColumn({ name: "id_recipient" })
  recipient!: User;

  @CreateDateColumn({ type: "timestamp", name: "date" })
  date!: Date;
}
