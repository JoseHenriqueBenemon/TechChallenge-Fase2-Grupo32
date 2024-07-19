import { postRepository } from "../../repository/post.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPost } from "models/interfaces/post.interface";

export async function getPostById(idPost: number): Promise<IPost> {
    const post = await postRepository.findOne({
        relations: ['user'],
        where: {
            id: idPost
        }
    });

    if(!post) throw new NotFoundError("Post");

    return post;
}