import { calculateOffset } from "../../utils/helper.util";
import { appDataSource } from "../../configs/database";
import { Post } from "../../models/post.model";

export async function getAllPosts(page: number, limit: number) {
    const postRepository = appDataSource.getRepository(Post);
    
    const skip = calculateOffset(page, limit);

    const posts = await postRepository.find({
        skip,
        take: limit
    });

    return posts;
}