
import { formatDate } from "utils/helper.util";
import { getAllPosts } from "../services/post/getAllPost.service";
import { Request, Response } from "express";
import { Post } from "models/post.model";

export async function getPosts(req: Request, res: Response): Promise<void>  {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const posts = await getAllPosts(page, limit);

        res.status(200).json({ posts });
    } catch (error) {
        throw error;
    }
}