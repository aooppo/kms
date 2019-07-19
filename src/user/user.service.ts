import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async findAll() : Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async add(data: UserDTO): Promise<UserEntity> {
        const user = this.userRepository.create(data)
        return await this.userRepository.save(user)
    }

    async update(id: string, user: Partial<UserDTO>) {
        await this.userRepository.update(id, user)
        return this.userRepository.findOne(id)
    }

    async remove(id: string) {
        const toDel = await this.userRepository.findOne(id);
        if(toDel) {
            return this.userRepository.remove(toDel)
        }
        throw new NotFoundException(`Couldn't found id: ${id} user.`)
    }

}
