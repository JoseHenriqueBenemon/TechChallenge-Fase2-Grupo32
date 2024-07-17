import { getPostById } from "../services/post/getPostById.service";
import { getAllPosts } from "../services/post/getAllPost.service";
import { NextFunction, Request, Response } from "express";

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const posts = await getAllPosts(page, limit);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = parseInt(req.params.id as string);
        
        const post = await getPostById(id);
        res.status(200).json(post);
    } catch(error) {
        next(error);
    }
}