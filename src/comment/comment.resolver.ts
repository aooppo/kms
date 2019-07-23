import { Resolver, Query, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { CommentEntity } from "./comment.entity";
import { ItemService } from "../item/item.service";

@Resolver('Comment')
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly itemService: ItemService,
    ) { }


    @Query()
    async comments() {
        return this.commentService.find()
    }

    @Query('comment')
    async getComment(@Args('id') id: string) {
        return await this.commentService.getOneWithRelations(id, 'item');
    }

    @ResolveProperty()
    async item(@Parent() comment: CommentEntity) {
        const { item } = comment;
        const { id } = item;
        return await this.itemService.findOne(id);
    }




}
