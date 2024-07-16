export interface IUser {
    id?: number | undefined;
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher';
    registrationNumber?: string;
    department?: string;
    createdAt: Date;
    updatedAt: Date;
}