import { NotFoundError } from "../../errors/NotFoundError";
import { postRepository } from "../../repository/post.repository";

export async function deletePost(id: number): Promise<void> {
    const post = await postRepository.findOne({
        where: {
            id: id
        }
    });

    if (!post) {
        throw new NotFoundError(`Postagem com ID ${id}`);
    }

    await postRepository.delete(id);
}