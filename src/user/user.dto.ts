import { IsString, IsNotEmpty } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    name: string
}

export class UserRO {
    id: string
    name: string
    created: Date
    token?: string
}