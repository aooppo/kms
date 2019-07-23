import { Injectable, Inject, Logger, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async getByName(name: string) {
        return await this.userRepository.findOne({
            where: {
                name
            }
        })
    }

    async get(id: string) {
        const u = await this.userRepository.findOne(id)
        if (!u) {
            throw new HttpException(`Not found ${id}`, HttpStatus.NOT_FOUND);
        }
        return u
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { name, password } = data
        const user = await this.userRepository.findOne({ where: { name } })
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password.', HttpStatus.BAD_REQUEST)
        }
        return user.toResponseObject()
    }

    async add(data: UserDTO): Promise<UserRO> {
        const { name } = data
        const u = await this.userRepository.findOne({ where: { name } })
        if (u) {
            throw new HttpException(`The user ${name} existed already.`, HttpStatus.BAD_REQUEST)
        }
        const user = this.userRepository.create(data)
        await this.userRepository.save(user)
        return user.toResponseObject()
    }

    async update(id: string, user: Partial<UserDTO>) {
        await this.userRepository.update(id, user)
        return this.userRepository.findOne(id)
    }

    async remove(id: string) {
        const toDel = await this.userRepository.findOne(id);
        if (toDel) {
            return this.userRepository.remove(toDel)
        }
        throw new NotFoundException(`Couldn't found id: ${id} user.`)
    }

}
