import { IPost } from "../../models/interfaces/post.interface";
import { getPostById } from "./getPostById.service";
import { NotFoundError } from "../../errors/NotFoundError";
import { validatePostData } from "./validatePostData.service";
import { postRepository } from "../../repository/post.repository";

export async function updatePost(id: number, data: Partial<IPost>): Promise<IPost> {
    const post = await getPostById(id, "PUT");
    
    if (!post) {
        throw new NotFoundError(`Postagem com ID ${id} não encontrada.`);
    }

    await validatePostData({ ...data, id: id}, true);

    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

    Object.assign(post, filteredData);
    
    return await postRepository.save(post);
}