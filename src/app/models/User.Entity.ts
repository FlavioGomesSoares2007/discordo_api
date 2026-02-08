import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class user {
  @PrimaryGeneratedColumn({ name: "id_user" })
  id_user!: number;

  @Column({name:"nome", type:"varchar", length:"100", nullable:false })
  nome!:string

  @Column({name:"email", type:"varchar", length:"200", nullable:false})
  email!:string

  @Column({name:"senha", type:"varchar"})
  senha!:string
}
