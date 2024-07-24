import { NotFoundError } from "../../errors/NotFoundError";
import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";
import { hashPassword } from "../../utils/helper.util";
import { getUserById } from "./getUserById.service";
import { validateUserData } from "./validateUserData.service";

export async function updateUser(idUser: number, userData: Partial<IUser>): Promise<IUser> {
    const user = await getUserById(idUser);
    if (!user) {
        throw new NotFoundError(`User with ID ${idUser} not found`);
    }

    await validateUserData({ ...userData, id: idUser }, true);

    if (userData.password) {
        userData.password = await hashPassword(userData.password);
    }

    const filteredData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v !== undefined));

    Object.assign(user, filteredData);

    return await userRepository.save(user);
}