import { Controller, Get, Inject, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, UsePipes, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

import { User } from '../shared/user.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('local'))
    @UsePipes(new ValidationPipe())
    @Post('signin')
    login(@User() user: UserRO | null) {
        return this.authService.login({ username: user.name, userId: user.id });
    }




    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(id, data)
    }


    @Get(':id')
    get(@Param('id') id: string) {
        return this.userService.get(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }

}
