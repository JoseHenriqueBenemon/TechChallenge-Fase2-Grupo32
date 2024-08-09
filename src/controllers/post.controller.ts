import { getPostById } from "../services/post/getPostById.service";
import { getAllPosts } from "../services/post/getAllPosts.service";
import { createPost } from "../services/post/createPost.service";
import { updatePost } from "../services/post/updatePost.service";
import { getPostsByKeyword } from "../services/post/getPostsByKeyword.service";
import { NextFunction, Request, Response } from "express";
import { postBodySchema, postParamsSchema, postQuerySchema, searchPostParamsSchema } from "../validation/post.schema";
import { formatPostResponse } from "../utils/formatPostResponse.util";

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { page, limit} = postQuerySchema.parse(req.query);

        const posts = await getAllPosts(page, limit);
        res.status(200).json(posts.map(formatPostResponse));
    } catch (error) {
        next(error);
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = postParamsSchema.parse(req.params);
        
        const post = await getPostById(id, "GET");

        res.status(200).json(formatPostResponse(post));
    } catch(error) {
        next(error);
    }
}

export async function searchPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { keyword, page, limit } = searchPostParamsSchema.parse(req.query);

        const posts = await getPostsByKeyword(keyword, page, limit);
        res.status(200).json(posts.map(formatPostResponse));
    } catch(error) {
        next(error);
    }
}

export async function addPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, description, category_subject, status, limit_date, user } = postBodySchema.parse(req.body);
        const user_id = req.user?.id as number;
        
        const post = await createPost({ user_id, title, description, category_subject, status, limit_date, user });
        res.status(201).json(formatPostResponse(post));
    } catch(error) {
        next(error);
    }
}

export async function putPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = postParamsSchema.parse(req.params);
        const { title, description, category_subject, status, limit_date } = postBodySchema.partial().parse(req.body);
        const newPost = await updatePost(id, { title, description, category_subject, status, limit_date });

        res.status(200).json(formatPostResponse(newPost));
        } catch (error) {
            next(error);
        }
    }

    