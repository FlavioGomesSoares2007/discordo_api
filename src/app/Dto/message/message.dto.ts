import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class MessageDto {
  @IsString({ message: "A mensagem deve ser um texto" })
  @IsNotEmpty({ message: "Você não pode enviar uma mensagem vazia" })
  @MinLength(1, { message: "A mensagem é muito curta" })
  message!: string;
}