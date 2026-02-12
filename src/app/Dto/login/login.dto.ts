import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString({message:"O email tem q ser uma string"})
    @IsNotEmpty({ message: "O email não pode estar vazio" })
    email!:string
    
    @IsString({message:"A senha tem q ser uma string"})
    @IsNotEmpty({ message: "A senha não pode estar vazio" })
    senha!:string
}