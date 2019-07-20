import { Controller, Get, Inject, Post, Body, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    @Inject() userService: UserService

    @Get()
    getAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @Post()
    save(@Body() data: UserDTO) {
        return this.userService.add(data)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(id, data)
    }


    @Get(":id")
    get(@Param("id") id:string) {
        return this.userService.get(id)
    }

    @Delete(":id")
    remove(@Param("id") id:string) {
        return this.userService.remove(id)
    }

}
