import { ConflictError } from "../../errors/ConflictError";
import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";
import { hashPassword } from "../../utils/helper.util";


export async function createUser(userData: IUser): Promise<IUser> {
    const existingUser = await userRepository.findOne({where: { email: userData.email }});
    if (existingUser) {
        throw new ConflictError("Email already registered!");
    }
    
    const hashedPassword = await hashPassword(userData.password);

    const userPartial = {
        ...userData,
        password: hashedPassword
    }

    const user = userRepository.create(userPartial);
    
    return await userRepository.save(user);
}