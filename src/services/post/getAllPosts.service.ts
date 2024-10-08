import { MoreThanOrEqual } from "typeorm";
import { postRepository } from "../../repository/post.repository";
import { calculateOffset } from "../../utils/helper.util";
import { IPost } from "../../models/interfaces/post.interface";

export async function getAllPosts(page: number, limit: number): Promise<IPost[]> {
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
        where: {
            limit_date: MoreThanOrEqual(new Date()),
            status: "Active"
        },
        skip,
        take: limit,
    });

    return posts;
}