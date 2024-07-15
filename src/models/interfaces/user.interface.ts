export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
    registrationNumber?: string;
    department?: string;
    createdAt: Date;
    updatedAt: Date;
}