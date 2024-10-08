import { IUser } from "./user.interface";

export interface IPost{
    id?: number | undefined;
    user_id: number;
    title: string;
    description: string;
    category_subject: 
        "Math" | 
        "Biology" | 
        "Physics" | 
        "Chemistry" | 
        "History" | 
        "Geography" | 
        "Portuguese" | 
        "English" | 
        "Literature" | 
        "Physical Education" | 
        "Arts" | 
        "Sociology" | 
        "Philosophy";
    status: "Active" | "Inactive";
    limit_date: Date;
    created_at?: Date;
    updated_at?: Date;
    user?: Partial<IUser>
}