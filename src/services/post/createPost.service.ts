
import { addHours } from 'date-fns';
import { postRepository } from "../../repository/post.repository";
import { IPost } from "../../models/interfaces/post.interface";
import { validatePostData } from "./validatePostData.service";

export async function createPost(postData: IPost): Promise<IPost> {
    await validatePostData(postData);

    const limitDate = new Date(postData.limit_date);
    const adjustedLimitDate = addHours(limitDate, 3);

    const post = await postRepository.create({
        ...postData,
        limit_date: adjustedLimitDate
    });

    return await postRepository.save(post);
}