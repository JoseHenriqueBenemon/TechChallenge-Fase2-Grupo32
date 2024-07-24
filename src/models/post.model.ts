import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { IPost } from './interfaces/post.interface';
import { User } from './user.model';

@Entity({ 
    name: 'posts' 
})
export class Post implements IPost {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id?: number;

    @Column({ name: 'title', type: 'varchar', length: 100 })
    title: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({
        name: 'category_subject',
        type: 'enum',
        enum: ["Math" , "Biology" , "Physics" , "Chemistry" , "History" , "Geography" , "Portuguese" , "English" , "Literature" , "Physical Education" , "Arts" , "Sociology" , "Philosophy"]
    })
    category_subject: "Math" | "Biology" | "Physics" | "Chemistry" | "History" | "Geography" | "Portuguese" | "English" | "Literature" | "Physical Education" | "Arts" | "Sociology" | "Philosophy";

    @Column({
        name: 'status',
        type: 'enum',
        enum: ['Active', 'Inactive'],
        default: 'Inactive'
    })
    status: 'Active' | 'Inactive';

    @Column({
        name: 'limit_date',
        type: 'timestamptz'
    })
    limit_date: Date;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz'
    })
    created_at?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz'
    })
    updated_at?: Date;

    @ManyToOne(
        () => User, 
        user => user.posts
    )
    @JoinColumn({ name: 'user_id' })
    user?: User;
}