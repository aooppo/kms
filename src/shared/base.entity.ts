import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class AbsEntity {
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
}