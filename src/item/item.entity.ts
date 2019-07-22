import { AbsEntity } from "../shared/base.entity";
import { Column, Entity } from "typeorm";
import { ItemStatus } from "./item.status";
import { CommentEntity } from "src/comment/comment.entity";

@Entity()
export class ItemEntity extends AbsEntity {

    price: number

    code: string

    @Column({
        type: 'enum',
        enum: ItemStatus,
        default: ItemStatus.Draft,
    })
    status: ItemStatus

}