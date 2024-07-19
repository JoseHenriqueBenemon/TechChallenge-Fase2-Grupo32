import { appDataSource } from "../configs/database";
import { Post } from "../models/post.model";

export const postRepository = appDataSource.getRepository(Post);