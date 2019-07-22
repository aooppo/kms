import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import * as jsonwebtoken from 'jsonwebtoken'
import { UserRO } from './user.dto';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    private id: string;

    @Column({
        type: 'text',
        unique: true
    })
    name: string

    @Column()
    password: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    description: string;

    @CreateDateColumn()
    private created: Date

    @UpdateDateColumn()
    private updated?: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)

    }

    toResponseObject(showToken = true): UserRO {
        const { id, created, name } = this
        let response: any = {
            id, created, name
        }
        if (showToken) {
            response.token = this.token
        }
        return response
    }

    async comparePassword(attempt: string) {
        console.log(await bcrypt.compare(attempt, this.password))
        return await bcrypt.compare(attempt, this.password)
    }

    private get token() {
        const { id, name } = this
        return jsonwebtoken.sign({ id, name }, process.env.SECRET, {
            expiresIn: '7d'
        })
    }

}   