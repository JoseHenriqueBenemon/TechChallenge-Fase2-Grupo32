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
    NotFoundError: (err, req, res) => {
        return res
        .status(404)
        .json({
            message: err.message
        })
    }
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    console.log(err.constructor.name);
    const handler = errorHandlerMap[err.constructor.name];

    if(handler) {
        return handler(err, req, res)
    };

    if(env.NODE_ENV === "development") {
        console.error(err);
    }

    return res.status(statusCode).json({ message: "Internal Server Error"});
}