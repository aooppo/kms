import { Controller, Get, Inject, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @Get()
    async getAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Post()
    async save(@Body() body) {
        const {name, password, description } = body
        return await this.userService.add({
            name,
            password,
            description
        })
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() body) {
        const {description, name } = body
        return await this.userService.update(id, {
            description,
            name
        })
    }

    @Delete(":id")
    async remove(@Param("id") id:string) {
        return this.userService.remove(id)
    }

}
