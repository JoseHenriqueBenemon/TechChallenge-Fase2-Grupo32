import { postRepository } from "../../repository/post.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPost } from "../../models/interfaces/post.interface";
import { MoreThanOrEqual } from "typeorm";

export async function getPostById(idPost: number): Promise<IPost> {
    const post = await postRepository.findOne({
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
            status: "Active",
            id: idPost
        }
    });

    if(!post) throw new NotFoundError("Post");

    return post;
}