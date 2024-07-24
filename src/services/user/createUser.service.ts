import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";
import { hashPassword } from "../../utils/helper.util";
import { validateUserData } from "./validateUserData.service";

export async function createUser(userData: IUser): Promise<IUser> {
    await validateUserData(userData);

    const hashedPassword = await hashPassword(userData.password);

    const userPartial = {
        ...userData,
        password: hashedPassword
    };
    
    const user = userRepository.create(userPartial);

    return await userRepository.save(user);
}