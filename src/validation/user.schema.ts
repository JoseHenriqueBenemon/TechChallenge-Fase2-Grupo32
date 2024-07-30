import { z } from "zod";

export const userBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(["Student", "Teacher"]),
    registration_number: z.string().optional(),
    department: z.string().optional(),
    posts: z.array(
        z.object({
            id: z.coerce.number(),
            user_id: z.coerce.number(),
            title: z.string(),
            description: z.string(),
            category_subject: z.enum(['Math', 'Biology', 'Physics', 'Chemistry', 'History', 'Geography', 'Portuguese', 'English', 'Literature', 'Physical Education', 'Arts', 'Sociology', 'Philosophy']),
            status: z.enum(["Active", "Inactive"]),
            limit_date: z.coerce.date()
        })
    ).optional()
});

export const signinUserBodySchema = z.object({
    email: z.string(),
    password: z.string()
});

export const userParamsSchema = z.object({
    id: z.coerce.number().min(1, "Id is required")
});

export const userQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
});