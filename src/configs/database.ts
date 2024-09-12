import { DataSource } from "typeorm";
import { env } from "./env-config";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

export const appDataSource = new DataSource({
    type: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    logging: env.NODE_ENV === "development",
    entities: [Post, User],
    migrations: [],
    synchronize: false
});

appDataSource.initialize()
.catch((err) => {
    console.error("Error conneting to database. Error: ", err);
});
