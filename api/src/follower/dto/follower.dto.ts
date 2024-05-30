import { IsString } from "class-validator";

export class FollowUserDto {
    @IsString()
    loggedInUserNickname: string;
    @IsString()
    targetUserNickname: string;
}
export class CheckFollowDto {
    @IsString()
    loggedInUserNickname: string;
    @IsString()
    targetUserNickname: string;
}
