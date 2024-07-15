import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "./interfaces/user.interface";

@Entity({
    name: 'users'
})
export class User implements IUser{
    @PrimaryGeneratedColumn('increment', { 
        name: 'id'
    })
    id?: number | undefined;

    @Column({
        name: 'name',
        type: 'varchar'
    })    
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar'
    })
    password: string;  
    
    @Column({
        name: 'role',
        type: 'enum',
        enum: ['student', 'teacher'],
        default: 'student'
    })
    role: 'student' | 'teacher';

    @Column({
        name: 'registration_number',
        type: 'varchar',
        nullable: true
    })
    registrationNumber?: string | undefined;

    @Column({
        name: 'department',
        type: 'varchar',
        nullable: true
    })
    department?: string | undefined;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
}