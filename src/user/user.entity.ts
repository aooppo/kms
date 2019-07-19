import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    private id: string;

    @Column()
    name: string

    @Column()
    password: string;

    @Column('text')
    description: string;

    @CreateDateColumn()
    private created: Date

    @UpdateDateColumn()
    private updated?: Date

    

}   