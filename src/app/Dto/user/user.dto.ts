import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsInt } from 'class-validator';

export class UserDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome!: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço válido' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha!: string;
}