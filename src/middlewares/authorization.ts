import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NextFunction, Request, Response } from "express";

function isAuthorized(userRole: string, userId: number, method: string, path: string): boolean {
    const userRouteId = parseInt(path.split("/")[2]);

    if (method === 'PUT' && path.startsWith('/users/')) {
        return userId === userRouteId;
    }

    if (method === 'GET' && path.startsWith('/users/')) {
        return userRole === 'Teacher' || (userRole === 'Student' && userId === userRouteId);
    }

    if (method === 'DELETE' && path.startsWith('/users/')) {
        return userId === userRouteId;
    }
    
    if (userRole !== 'Teacher') {
        return false;
    }

    return true;
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const { method, path } = req;

    if(!userRole || !userId) {
        return next(new UnauthorizedError("Unauthorized request!"));
    }

    if(!isAuthorized(userRole, userId, method, path)) { 
        return next(new ForbiddenError("You do not have permission to access this path!"));
    }

    next();
}