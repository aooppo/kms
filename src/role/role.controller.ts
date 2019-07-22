import { Controller, Body, Param, Patch, Get, Post, Delete } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { RoleDTO, RoleRO } from './role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    show() {
        return this.roleService.show()
    }

    @Post()
    add(@Body() data: RoleDTO): Promise<RoleRO> {
        return this.roleService.add(data);
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
