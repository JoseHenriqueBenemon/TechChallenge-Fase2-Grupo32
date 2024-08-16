import { postRepository } from "../../repository/post.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPost } from "../../models/interfaces/post.interface";

export async function getPostById(idPost: number, httpMethod: string): Promise<IPost> {
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
            id: idPost
        }
    });

    if(!post) throw new NotFoundError("Post");

    if (httpMethod === "GET") {
        if (post.status !== "Active" || (new Date(post.limit_date).setHours(23, 59)) < (new Date().setHours(-3))) {
            throw new NotFoundError(`Postagem com ID ${idPost}`);
        }
    }

    return post;
}