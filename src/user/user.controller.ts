import { Controller, Get, Inject, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @Get()
    async getAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Post()
    async save(@Body() data: UserDTO) {
        return await this.userService.add(data)
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: Partial<UserDTO>) {
        return await this.userService.update(id, data)
    }

    @Delete(":id")
    async remove(@Param("id") id:string) {
        return this.userService.remove(id)
    }

}
