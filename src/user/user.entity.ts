import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import * as jsonwebtoken from 'jsonwebtoken'
import { UserRO } from './user.dto';
import { AbsEntity } from '../shared/base.entity';
import { Field, Int, ObjectType } from 'type-graphql';
@Entity()
@ObjectType()
export class UserEntity { //extends AbsEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({
        unique: true,
        type: 'text'
    })
    @Field()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
    @Field()
    @Column()
    password: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    @Field()
    description: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)

    }

    toResponseObject(showToken = true): UserRO {
        const { id, created, name } = this
        let response: any = {
            id, created, name
        }

        return response
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password)
    }
}   