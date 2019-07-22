import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { ItemEntity } from './item.entity';
import { ItemService } from './item.service';

@Crud(
    {
        model: {
            type: ItemEntity
        }
    }
)
@Controller('item')
export class ItemController implements CrudController<ItemEntity>{
    constructor(public service: ItemService) { }
    // constructor(public service: CommentService) { }
}
