import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from "class-validator";

export class UserUpdateDTO {
  @IsString({ message: "O nome deve ser uma string" })
  @IsOptional()
  @IsNotEmpty({ message: "O nome não pode estar vazio" })
  nome?: string;

  @IsEmail({}, { message: "O e-mail deve ser um endereço válido" })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  senha?: string;
}
