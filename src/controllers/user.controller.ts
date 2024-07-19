import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/user/createUser.service";
import { getAllUsers } from "../services/user/getAllUsers.service";
import { getUserById } from "../services/user/getUserById.service";
import z from "zod";

const userBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
               "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"),
    role: z.enum(["Student", "Teacher"]),
    registration_number: z.string().optional(),
    department: z.string().optional(),
    posts: z.array(
        z.object({
            id: z.coerce.number(),
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
            category_subject: z.enum(['Math', 'Biology', 'Physics', 'Chemistry', 'History', 'Geography', 'Portuguese', 'English', 'Literature', 'Physical Education', 'Arts', 'Sociology', 'Philosophy']),
            status: z.enum(["Active", "Inactive"]),
            limit_date: z.coerce.date().min(new Date("2024-01-01"), "Date must be on or after 2024-01-01")
        })
    ).optional()
}).refine((data) => {
    if (data.role === "Student" && !data.registration_number) {
        return false;
    }
    if (data.role === "Teacher" && !data.department) {
        return false;
    }
    return true;
}, {
    message: "Registration number is required for students and department is required for teachers",
    path: ["role"],
});

const userParamsSchema = z.object({
    id: z.coerce.number().min(1, "Id is required")
});

const userQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
});

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit} = userQuerySchema.parse(req.query);

        const users = await getAllUsers(page, limit);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = userParamsSchema.parse(req.params);
        
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch(error) {
        next(error);
    }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    try {

        const { name, email, password, role, registration_number, department, posts } = userBodySchema.parse(req.body);

        const user = await createUser({ name, email, password, role, registration_number, department, posts });

        res.status(201).json({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            role: user?.role
        })
    } catch(error) {
        next(error);
    }
}