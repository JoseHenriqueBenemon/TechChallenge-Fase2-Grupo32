import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { IPost } from './interfaces/post.interface';
import { User } from './user.model';

export enum CategorySubject {
    Math = 'Math',
    Biology = 'Biology',
    Physics = 'Physics',
    Chemistry = 'Chemistry',
    History = 'History',
    Geography = 'Geography',
    Portuguese = 'Portuguese',
    English = 'English',
    Literature = 'Literature',
    PhysicalEducation = 'Physical Education',
    Arts = 'Arts',
    Sociology = 'Sociology',
    Philosophy = 'Philosophy'
}

export enum PostStatus {
    Active = 'Active',
    Inactive = 'Inactive'
}

@Entity({ name: 'posts' })
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
        enum: CategorySubject
    })
    category_subject: CategorySubject;

    @Column({
        name: 'status',
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.Inactive
    })
    status: PostStatus;

    @Column({
        name: 'limit_date',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        transformer: {
            to: (value: Date) => value,
            from: (value: string | null) => value ? new Date(value).toLocaleDateString() : null,
        }
    })
    limit_date: Date;

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

    @ManyToOne(
        () => User, 
        user => user.posts
    )
    @JoinColumn({ name: 'user_id' })
    user?: User;
}