import { appDataSource } from "../configs/database";
import { User } from "../models/user.model";

export const userRepository = appDataSource.getRepository(User);