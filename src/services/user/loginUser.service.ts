import { env } from "../../configs/env-config";
import { ValidationError } from "../../errors/ValidationError";
import { userRepository } from "../../repository/user.repository";
import { comparePassword } from "../../utils/helper.util";
import jwt from "jsonwebtoken";

export async function  loginUser(email: string, password: string) {
    const user = await userRepository.findOneBy({ email });

    if (!user) throw new ValidationError("Invalid email or password!");

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid) throw new ValidationError("Invalid email or password!");

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
}