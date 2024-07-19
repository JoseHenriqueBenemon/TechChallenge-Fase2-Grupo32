import { NotFoundError } from "../../errors/NotFoundError";
import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";

export async function getUserById(idUser: number): Promise<IUser> {
    const user = await userRepository.findOne({
        relations: ['posts'],
        where: {
            id: idUser   
        }
    });

    if(!user) throw new NotFoundError("User");

    return user;
}