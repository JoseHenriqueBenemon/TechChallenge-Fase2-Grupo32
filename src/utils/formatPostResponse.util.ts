import { IPost } from "../models/interfaces/post.interface";
import { addHours, formatDate } from "./helper.util";

export function formatPostResponse(post: IPost) {
    return {
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        description: post.description,
        category_subject: post.category_subject,
        status: post.status,
        limit_date: formatDate(addHours(post.limit_date, 3)),
        created_at: post.created_at?.toLocaleDateString("pt-BR"),
        updated_at: post.updated_at?.toLocaleDateString("pt-BR"),
        user: post.user
    };
}