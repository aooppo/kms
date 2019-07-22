import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { AbsEntity } from "../shared/base.entity";

@Entity()
export class RoleEntity extends AbsEntity {

    @Column({
        nullable: true,
        type: 'text'
    })
    description: string

}