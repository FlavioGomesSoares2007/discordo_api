import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.Entity";

@Entity("friends")
export class Friends {
  @PrimaryGeneratedColumn({ name: "id_friends" })
  id_friends!: number;

  @Column({ name: "id_user_1", type: "int", nullable: false })
  id_user_1!: number;

  @ManyToOne(() => User, (user) => user.friendsAsSecond)
  @JoinColumn({ name: "id_user_1" })
  user1!: User;

  @Column({ name: "id_user_2", type: "int", nullable: false })
  id_user_2!: number;

  @ManyToOne(() => User, (user) => user.friendsAsSecond)
  @JoinColumn({ name: "id_user_2" })
  user2!: User;

  @CreateDateColumn({ type: "timestamp", name: "date" })
  date!: Date;
}
