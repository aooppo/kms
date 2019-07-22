import { AbsEntity } from "../shared/base.entity";
import { Column, Entity } from "typeorm";

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
}