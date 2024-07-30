import z from "zod";

export const postBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    category_subject: z.enum(['Math', 'Biology', 'Physics', 'Chemistry', 'History', 'Geography', 'Portuguese', 'English', 'Literature', 'Physical Education', 'Arts', 'Sociology', 'Philosophy']),
    status: z.enum(["Active", "Inactive"]),
    limit_date: z.coerce.date(),
    user: z.object({
        id: z.coerce.number(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.enum(["Student", "Teacher"]),
        registration_number: z.string().optional(),
        department: z.string().optional()
    }).optional()
});

export const postParamsSchema = z.object({
    id: z.coerce.number().min(1, "Id is required")
});

export const postQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
});

export const searchPostParamsSchema = z.object({
    keyword: z.string(),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
});