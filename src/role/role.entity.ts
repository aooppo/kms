import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({
        unique: true,
        type: 'text'
    })
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @Column({
        nullable: true,
        type: 'text'
    })
    description: string

}