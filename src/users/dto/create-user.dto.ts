import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
