import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    description: string

    password?: string
    @IsString()
    name: string
}