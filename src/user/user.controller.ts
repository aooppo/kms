import { Controller, Get, Inject, Post, Body, Param, Patch, Delete } from '@nestjs/common';
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
        } as User
        return await this.userService.add(u)
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() body) {
        const {firstName, lastName, age } = body
        return await this.userService.update(id, {
            firstName,
            lastName,
            age
        } as User)
    }

    @Delete(":id")
    async remove(@Param("id") id:string) {
        return this.userService.remove(id)
    }

}
