import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";
import { calculateOffset } from "../../utils/helper.util";

export async function getAllUsers(page: number, limit: number): Promise<IUser[]> {
    const skip = calculateOffset(page, limit);

    const users = await userRepository.find({
        relations: ['posts'],
        skip,
        take: limit
    });

    return users;
}