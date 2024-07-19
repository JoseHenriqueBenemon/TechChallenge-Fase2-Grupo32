import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "./interfaces/user.interface";
import { Post } from "./post.model";
import { IPost } from "./interfaces/post.interface";

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
        type: 'varchar',
        length: 50
    })    
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255
    })
    password: string;  
    
    @Column({
        name: 'role',
        type: 'enum',
        enum: ['Student', 'Teacher'],
        default: 'Student'
    })
    role: 'Student' | 'Teacher';

    @Column({
        name: 'registration_number',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    registration_number?: string | undefined;

    @Column({
        name: 'department',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    department?: string | undefined;

    @CreateDateColumn({
        name: 'created_at',
        transformer: {
            to: (value: Date) => value,
            from: (value: string | null) => value ? new Date(value).toLocaleDateString() : null,
        }
    })
    created_at?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        transformer: {
            to: (value: Date) => value,
            from: (value: string | null) => value ? new Date(value).toLocaleDateString() : null,
        }
    })
    updated_at?: Date;

    @OneToMany(
        () => Post, 
        post => post.user
    )
    posts?: IPost[]
    
}