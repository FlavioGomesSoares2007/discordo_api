import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.Entity";

@Entity("friends")
export class Friends {
  @PrimaryGeneratedColumn({ name: "id_friends" })
  id_friends!: number;

  @Column({ name: "id_user_1" })
  id_user_1!: number;

  @Column({ name: "id_user_2" })
  id_user_2!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user_1" })
  user1!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user_2" })
  user2!: User;

  @CreateDateColumn({ name: "date" })
  date!: Date;
}