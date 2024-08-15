import { IPost } from "../../models/interfaces/post.interface";
import { postRepository } from "../../repository/post.repository";
import { calculateOffset } from "../../utils/helper.util";

export async function getAllPostsAdmin(page: number, limit: number): Promise<IPost[]> {
    const skip = calculateOffset(page, limit);
    const posts = await postRepository.find({
        relations: ["user"],
        select: {
            id: true,
            title: true,
            description: true,
            category_subject: true,
            status: true,
            limit_date: true,
            created_at: true,
            updated_at: true,
            user: {
                name: true
            }
        },
        skip,
        take: limit,
    });

    return posts;
}
