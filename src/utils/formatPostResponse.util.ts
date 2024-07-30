import { IPost } from "../models/interfaces/post.interface";

export function formatPostResponse(post: IPost) {
    const addHours = (date: Date | string, hours: number): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    };

    const formatDate = (date: Date | string | undefined): string | undefined => {
        if (!date) return undefined;
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        return parsedDate.toLocaleDateString("pt-BR");
    };

    return {
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        description: post.description,
        category_subject: post.category_subject,
        status: post.status,
        limit_date: formatDate(addHours(post.limit_date, 3)),
        created_at: post.created_at?.toLocaleDateString(),
        updated_at: post.updated_at?.toLocaleDateString(),
        user: post.user
    };
}   