import { NotFoundError } from "../../errors/NotFoundError";
import { appDataSource } from "../../configs/database";
import { Post } from "../../models/post.model";

export async function getPostById(idPost: number) {
    const postRepository = appDataSource.getRepository(Post);
    const post = await postRepository.findOne({
        relations: ['user'],
        where: {
            id: idPost
        }
    });

    if(!post) throw new NotFoundError("Post");

    return post;
}