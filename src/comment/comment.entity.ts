import { Column, Entity, ManyToOne } from "typeorm";
import { AbsEntity } from "../shared/base.entity";
import { ItemEntity } from "../item/item.entity";

@Entity()
export class CommentEntity extends AbsEntity {
    @Column({
        type: 'text'
    })
    title: string

    @Column({
        type: 'text'
    })
    content: string

    @ManyToOne(type => ItemEntity)
    item: ItemEntity

}