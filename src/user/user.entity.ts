import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @CreateDateColumn()
    private created: Date

    @UpdateDateColumn()
    private updated?: Date

    

}   