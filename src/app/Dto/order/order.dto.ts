import { IsNotEmpty, IsString } from "class-validator";

export class requestedDto{
    @IsString({message:"O nome tem que ser uma string"})
    @IsNotEmpty({message:"O nome não poder ser vacio"})
    nome!:string
}