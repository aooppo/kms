import { Controller, Get, Inject, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @UseGuards(new AuthGuard())
    @Get()
    async getAll(@User() user: any): Promise<UserRO[]> {
        const users = await this.userService.findAll()
        return users.map(u => u.toResponseObject(false))
    }

    @UsePipes(new ValidationPipe())
    @Post('signup')
    register(@Body() data: UserDTO): Promise<UserRO> {
        return this.userService.add(data)
    }

    @UsePipes(new ValidationPipe())
    @Post('signin')
    login(@Body() data: UserDTO): Promise<UserRO> {
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
