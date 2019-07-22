import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService extends TypeOrmCrudService<CommentEntity> {
    constructor(@InjectRepository(CommentEntity) repo) {
        super(repo);
    }
}
