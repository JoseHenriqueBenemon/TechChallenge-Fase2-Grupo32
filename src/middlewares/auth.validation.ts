import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ValidationError } from "../errors/ValidationError";
import { env } from "../configs/env-config";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../models/interfaces/JwtPayLoad.interface";
import jwt from "jsonwebtoken";

const routeFreeList = [
    "POST-/api/users", 
    "POST-/api/users/signin"
];

export async function authValidation(req: Request, _: Response, next: NextFunction) {
    const validateRoute = `${req.method}-${req.path}`;
    if(routeFreeList.includes(validateRoute)){
        return next();
    }

    const token = req.headers['authorization']?.split(" ")[1];
    if(!token) {
        const unauthorizedError = new UnauthorizedError("Access Denied!");
        return next(unauthorizedError);
    }

    try {
        const verified = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        req.user = verified;
        next();
    } catch(error) {
        const validationError = new ValidationError("Invalid Token!");
        return next(validationError);
    }
}