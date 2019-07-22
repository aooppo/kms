import { IsString, IsNotEmpty } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    name: string
}