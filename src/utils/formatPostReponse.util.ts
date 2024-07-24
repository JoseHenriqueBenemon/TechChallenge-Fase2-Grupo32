import { IPost } from "models/interfaces/post.interface";

export function formatPostReponse(post: IPost) {
    const finalResponse = {
        id: post.id,
        title: post.title,
        description: post.description,
        category_subject: post.category_subject,
        status: post.status,
        limit_date: post.limit_date.toLocaleDateString(),
        created_at: post.created_at?.toLocaleDateString(),
        updated_at: post.updated_at?.toLocaleDateString(),
        user: post.user
    };

    return finalResponse;
}