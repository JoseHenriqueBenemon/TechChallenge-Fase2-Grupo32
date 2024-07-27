import { Brackets } from "typeorm";
import { postRepository } from "../../repository/post.repository";
import { calculateOffset } from "../../utils/helper.util";
import { IPost } from "../../models/interfaces/post.interface";

export async function getPostsByKeyword(word: string, page: number, limit: number): Promise<IPost[]>{
    const skip = calculateOffset(page, limit);

    const posts = postRepository.createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .select([
            "post",
            "user.name"
        ])
        .where("post.limit_date >= :date", { date: new Date() })
        .andWhere("post.status = :status", { status: "Active" })
        .andWhere(new Brackets(qb => {
            qb.where("post.description ILIKE :word", { word: `%${word}%` })
              .orWhere("post.title ILIKE :word", { word: `%${word}%` });
        }))
        .skip(skip)
        .take(limit)
        .getMany();    

    return posts;
}