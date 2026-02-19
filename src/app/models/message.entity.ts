import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,} from "typeorm";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn({ name: "id_message" })
  id_message!: number;

  @Column({ name: "id_sender", type: "int", nullable: false })
  id_sender!: number;

  @Column({ name: "id_recipient", type: "int", nullable: false })
  id_recipient!: number;

  @Column({name:"message", type:"text", nullable:false})
  message!:string

  @CreateDateColumn({name:"date", type:"timestamp"})
  data!:Date
}
