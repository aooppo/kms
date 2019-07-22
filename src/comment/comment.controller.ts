import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { CommentEntity } from './comment.entity';
import { CommentService } from '../comment/comment.service';

@Crud({
    model: {
        type: CommentEntity,
    },
})
@Controller('comment')
export class CommentController implements CrudController<CommentEntity> {
    constructor(public service: CommentService) { }


}
