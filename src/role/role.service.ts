import { Injectable, HttpException, HttpStatus, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RoleEntity } from './role.entity';
import { RoleDTO, RoleRO } from './role.dto';
// import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
    constructor(@InjectRepository(RoleEntity) repo) {
        super(repo)
    }

    async show() {
        return await this.repo.find()
    }

    async add(user: string, data: RoleDTO): Promise<RoleRO> {

        // const u = await this.userService.get(user)

        const { name } = data
        const role = await this.repo.findOne({ where: { name } })
        if (role) {
            throw new HttpException(`The role ${name} existed already.`, HttpStatus.BAD_REQUEST)
        }
        const r = this.repo.create(data)
        await this.repo.save(r)
        return r
    }

    async update(id: string, role: Partial<RoleDTO>) {
        await this.repo.update(id, role)
        return this.repo.findOne(id)
    }

    async remove(id: string) {
        const toDel = await this.repo.findOne(id);
        if (toDel) {
            return this.repo.remove(toDel)
        }
        throw new NotFoundException(`Couldn't found id: ${id} role.`)
    }
}
