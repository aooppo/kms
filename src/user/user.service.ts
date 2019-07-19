import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async findAll() : Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async add(user: UserEntity): Promise<UserEntity> {
        const u = this.userRepository.save(user)
        return u
    }

    async update(id: string,user: UserEntity): Promise<UserEntity| null> {
        const toUpdate = await this.userRepository.findOne(id);
        if(toUpdate) {
            let updated = Object.assign(toUpdate, user)
        }
        return await this.userRepository.save(toUpdate)
    }

    async remove(id: string) {
        const toDel = await this.userRepository.findOne(id);
        if(toDel) {
            return this.userRepository.remove(toDel)
        }
        throw new NotFoundException(`Couldn't found id: ${id} user.`)
    }

}
