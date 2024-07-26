import { ValidationError } from "../../errors/ValidationError";
import { ConflictError } from "../../errors/ConflictError";
import { IUser } from "../../models/interfaces/user.interface";
import { userRepository } from "../../repository/user.repository";
import { isValidEmail, isValidPassword } from "../../utils/helper.util";

export async function validateUserData(userData: Partial<IUser>, isUpdate: boolean = false): Promise<void> {
    if (userData.password && !isValidPassword(userData.password)) {
        throw new ValidationError("Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one digit, and one special character.");
    }

    if (userData.email && !isValidEmail(userData.email)) {
        throw new ValidationError("Invalid email format.");
    }

    if (userData.role === "Student" && !userData.registration_number) {
        throw new ValidationError("registration_number is required for students.");
    }

    if (userData.role === "Teacher" && !userData.department) {
        throw new ValidationError("department is required for teachers.");
    }

    if (userData.email) {
        const existingUser = await userRepository.findOneBy({ email: userData.email });
        if (existingUser) {
            if (!isUpdate || (isUpdate && existingUser.id !== userData.id)) {
                throw new ConflictError("Email already registered!");
            }
        }
    }
}