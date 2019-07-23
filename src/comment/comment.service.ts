import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService extends TypeOrmCrudService<CommentEntity> {
    constructor(@InjectRepository(CommentEntity) repo) {
        super(repo);
    }

    async getOneWithRelations(id: string, ...arr: string[]) {
        return await this.repo.findOne(id, {
            relations: [...arr]
        })
    }
}
