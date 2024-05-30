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

export class UserPublicDto {
    nickname: string;
    name: string;
    picture: string;
    birthdate: Date;
    created_at: Date;
    isActivated: boolean;
    followers: any[];
    following: any[];
}
