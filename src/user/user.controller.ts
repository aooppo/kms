import { Controller, Get, Inject, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post()
    async save(@Body() body) {
        const {firstName, lastName, age } = body
        const u = {
            firstName,
            lastName,
            age
        }
        return await this.userService.add(u)
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() body) {
        const {firstName, lastName, age } = body
        return await this.userService.update(id, {
            firstName,
            lastName,
            age
        })
    }

}
