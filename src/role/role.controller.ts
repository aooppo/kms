import { Controller, Body, Param, Patch, Get, Post, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { RoleDTO, RoleRO } from './role.dto';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }



    @Get()
    show(): Promise<RoleRO[]> {

        return this.roleService.show()
    }
    @UseGuards(new AuthGuard())
    @Post()
    add(@User('id') user: string, @Body() data: RoleDTO): Promise<RoleRO> {
        console.log('role> ', user)
        return this.roleService.add(user, data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<RoleDTO>): Promise<RoleRO> {
        return this.roleService.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(id)
    }

}
