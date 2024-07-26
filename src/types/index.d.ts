import { JwtPayload } from "../models/interfaces/JwtPayLoad.interface";
import { Request } from "express";

declare module "express" {
    export interface Request {
        user?: JwtPayload;
    }
}