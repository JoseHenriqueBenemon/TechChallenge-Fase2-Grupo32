import { NextFunction, Request, Response } from "express";
import { getAllUsers } from "../services/user/getAllUsers.service";
import { getUserById } from "../services/user/getUserById.service";
import { createUser } from "../services/user/createUser.service";
import { updateUser } from "../services/user/updateUser.service";
import { loginUser } from "../services/user/loginUser.service";
import { formatUserResponse } from "../utils/formatUserResponse.util";
import { signinUserBodySchema, userBodySchema , userParamsSchema, userQuerySchema } from "../validation/user.schema";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit} = userQuerySchema.parse(req.query);

        const users = await getAllUsers(page, limit);
        res.status(200).json(users.map(formatUserResponse));
    } catch (error) {
        next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = userParamsSchema.parse(req.params);
        
        const user = await getUserById(id);
        res.status(200).json(formatUserResponse(user));
    } catch(error) {
        next(error);
    }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password, role, registration_number, department, posts } = userBodySchema.parse(req.body);

        const user = await createUser({ name, email, password, role, registration_number, department, posts });
        res.status(201).json(formatUserResponse(user));
    } catch(error) {
        next(error);
    }
}

export async function modifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = userParamsSchema.parse(req.params);
        const { name, email, password, role, registration_number, department, posts } = userBodySchema.partial().parse(req.body);

        const modifiedUser = await updateUser(id, { name, email, password, role, registration_number, department, posts });
        res.status(200).json(formatUserResponse(modifiedUser));
    } catch (error) {
        next(error);
    }
}

export async function signinUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = signinUserBodySchema.parse(req.body);

        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}