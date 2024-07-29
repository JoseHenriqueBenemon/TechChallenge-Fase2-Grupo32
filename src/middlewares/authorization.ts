import { ForbiddenError } from "../errors/ForbiddenError";
import { NextFunction, Request, Response } from "express";

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const validateRoute = `${req.method}-${req.path}`;
    if (validateRoute.includes("PUT-/users/")) {
        if (req.user?.id !== parseInt(req.url.split("/")[2])) {
            return next( new ForbiddenError("You can only change your own account!"));
        }
        
        return next();
    }

    if(validateRoute.includes("GET-/users/")) {
        if (req.user?.role === 'Student' && req.user?.id !== parseInt(req.url.split("/")[2])) {
            return next( new ForbiddenError("You can only get your own account!"));
        }

        return next();
    }

    if(req.user?.role !== 'Teacher') {
        return next(new ForbiddenError("Teachers only can access this path!"));
    }

    next();
}