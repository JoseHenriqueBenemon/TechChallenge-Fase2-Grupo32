import { ConflictError } from "../../errors/ConflictError";
import { NotFoundError } from "../../errors/NotFoundError";
import { userRepository } from "../../repository/user.repository";

export async function deleteUser(idUser: number): Promise<void> {
    const user = await userRepository.findOne({
        relations: ['posts'],
        where: {
            id: idUser   
        }
    });
    
    if(!user) throw new NotFoundError("User");

    if(user.posts?.length) throw new ConflictError("There are posts by this user!");

    await userRepository.delete(idUser);
}