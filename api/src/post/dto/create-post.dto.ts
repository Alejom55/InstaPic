import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    uri_resource: string;

    @IsString()
    @IsNotEmpty()
    email: string;
}

