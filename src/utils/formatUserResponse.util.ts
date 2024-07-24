import { IUser } from "models/interfaces/user.interface";

export function formatUserResponse(user: IUser) {
    const roleSpecificFields = 
        user.role === 'Student'
        ? { registration_number: user.registration_number }
        : user.role === 'Teacher'
        ? { department: user.department }
        : {};

    const finalResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...roleSpecificFields,
        created_at: user.created_at?.toLocaleDateString(),
        updated_at: user.updated_at?.toLocaleDateString(),
        posts: user.posts
    };

    return finalResponse;
}