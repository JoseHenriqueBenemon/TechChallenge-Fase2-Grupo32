import { DataSource } from "typeorm";
import { env } from "./env-config";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import fs from 'fs';
import path from 'path';

export const appDataSource = new DataSource({
    type: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    logging: env.NODE_ENV === "development",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../../certs/ca.pem')).toString()
    },
    entities: [Post, User],
    migrations: [],
    synchronize: true
});

appDataSource.initialize()
.catch((err) => {
    console.error("Error conneting to database. Error: ", err);
});