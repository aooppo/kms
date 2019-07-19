import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findAll() : Promise<User[]> {
        return await this.userRepository.find()
    }

    async add(user: User): Promise<User> {
        const r =  await this.userRepository.create(user)
        const u = this.userRepository.save(r)
        return u
    }

    async update(id: string,user: User): Promise<User| null> {
        const toUpdate = await this.userRepository.findOne(id);
        if(toUpdate) {
            let updated = Object.assign(toUpdate, user)
        }
        return await this.userRepository.save(toUpdate)
    }

}
