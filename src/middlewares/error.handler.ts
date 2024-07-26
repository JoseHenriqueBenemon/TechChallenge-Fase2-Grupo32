import { ZodError } from "zod";
import { env } from "../configs/env-config";
import { NextFunction, Request, Response } from "express";

interface ErrorHandlerMap {
    [key: string]: (
        error: Error,
        request: Request,
        response: Response
    ) => void
};

export const errorHandlerMap: ErrorHandlerMap = {
    ZodError: (err, _, res) => {
        return res
        .status(400)
        .json({
            message: "Validation error",
            ...(err  instanceof ZodError && { error: err.format() })
        })
    },
    NotFoundError: (err, _, res) => {
        return res
        .status(404)
        .json({
            message: err.message
        })
    },
    ConflictError: (err, _, res) => {
        return res
        .status(409)
        .json({
            message: err.message
        })
    },
    ValidationError: (err, _, res) => {
        return res
        .status(400)
        .json({
            message: err.message
        })
    },
    UnauthorizedError: (err, _, res) => {
        return res
        .status(401)
        .json({
            message: err.message
        })
    },
    ForbiddenError: (err, _, res) => {
        return res
        .status(403)
        .json({
            message: err.message
        })
    }
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const handler = errorHandlerMap[err.constructor.name];

    if(handler) {
        return handler(err, req, res)
    };

    if(env.NODE_ENV === "development") {
        console.error(err);
    }

    return res.status(statusCode).json({ message: err.message });
}