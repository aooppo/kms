import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';
import { ItemEntity } from '../item/item.entity';
import { CommentResolver } from './comment.resolver';
import { ItemModule } from '../item/item.module';


@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ItemEntity]), ItemModule],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
  controllers: [CommentController],
})
export class CommentModule { }
