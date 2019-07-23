import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ItemEntity } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService extends TypeOrmCrudService<ItemEntity> {
    constructor(@InjectRepository(ItemEntity) repo: Repository<ItemEntity>) {
        super(repo);
    }
}
