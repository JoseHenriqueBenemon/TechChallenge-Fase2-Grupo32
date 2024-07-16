import { NextFunction, Request, Response } from "express";
import { env } from "./configs/env-config";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error("Erro não tratado:", err)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        stack: env.NODE_ENV === 'production' ? "Strack Trace not available" : err.stack
    })
}