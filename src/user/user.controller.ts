import { Controller, Get, Inject, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @Get()
    async getAll() {
        const users = await this.userService.findAll()
        return users.map(u => u.toResponseObject(false))
    }

    @UsePipes(new ValidationPipe())
    @Post('signup')
    register(@Body() data: UserDTO) {
        return this.userService.add(data)
    }

    @UsePipes(new ValidationPipe())
    @Post('signin')
    login(@Body() data: UserDTO) {
        return this.userService.login(data)
    }




    @Patch(":id")
    update(@Param("id") id: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(id, data)
    }


    @Get(":id")
    get(@Param("id") id: string) {
        return this.userService.get(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(id)
    }

}
