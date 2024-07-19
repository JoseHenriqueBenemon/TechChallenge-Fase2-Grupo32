import { getPostById } from "../services/post/getPostById.service";
import { getAllPosts } from "../services/post/getAllPosts.service";
import { NextFunction, Request, Response } from "express";
import z from 'zod';

const postParamsSchema = z.object({
    id: z.coerce.number().min(1, "Id is required")
});

const postQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
});

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { page, limit} = postQuerySchema.parse(req.query);

        const posts = await getAllPosts(page, limit);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = postParamsSchema.parse(req.params);
        
        const post = await getPostById(id);
        res.status(200).json(post);
    } catch(error) {
        next(error);
    }
}