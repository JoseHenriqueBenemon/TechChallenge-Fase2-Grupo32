import { userRepository } from "../../repository/user.repository";
import { IPost } from "../../models/interfaces/post.interface";
import { NotFoundError } from "../../errors/NotFoundError";

export async function validatePostData(postData: Partial<IPost>, isUpdated: boolean = false): Promise<void> {
    if (postData.user?.id) {
        if (!await userRepository.findOneBy({ id: postData.user?.id })) {
            throw new NotFoundError("User ID");
        }
    }
}