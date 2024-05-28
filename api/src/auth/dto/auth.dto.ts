import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @IsString()
    nickname: string;
    @IsString()
    token: string;
    @IsString()
    picture: string;
}
