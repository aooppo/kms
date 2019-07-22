import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { RoleDTO, RoleRO } from './role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) { }

    async show() {
        return await this.roleRepository.find()
    }

    async add(data: RoleDTO): Promise<RoleRO> {
        const { name } = data
        const u = await this.roleRepository.findOne({ where: { name } })
        if (u) {
            throw new HttpException(`The role ${name} existed already.`, HttpStatus.BAD_REQUEST)
        }
        const r = this.roleRepository.create(data)
        await this.roleRepository.save(r)
        return r
    }

    async update(id: string, role: Partial<RoleDTO>) {
        await this.roleRepository.update(id, role)
        return this.roleRepository.findOne(id)
    }

    async remove(id: string) {
        const toDel = await this.roleRepository.findOne(id);
        if (toDel) {
            return this.roleRepository.remove(toDel)
        }
        throw new NotFoundException(`Couldn't found id: ${id} role.`)
    }
}
