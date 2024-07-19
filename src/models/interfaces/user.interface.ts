import { IPost } from "./post.interface";

export interface IUser {
    id?: number | undefined;
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher';
    registration_number?: string | undefined;
    department?: string | undefined;
    created_at?: Date;
    updated_at?: Date;
    posts?: IPost[]
}