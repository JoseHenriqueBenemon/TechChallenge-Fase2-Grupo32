import { postRepository } from "../../repository/post.repository";
import { calculateOffset } from "../../utils/helper.util";
import { IPost } from "models/interfaces/post.interface";

export async function getAllPosts(page: number, limit: number): Promise<IPost[]> {
    const skip = calculateOffset(page, limit);

    const posts = await postRepository.find({
        relations: ["user"],
        skip,
        take: limit
    });

    return posts;
}