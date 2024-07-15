import { DataSource } from "typeorm";
import { env } from "./env-config";

export const appDataSource = new DataSource({
    type: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    logging: env.NODE_ENV === "development",
    entities: [],
    migrations: []
});

appDataSource.initialize()
.then(() => {
    console.log("DataBase with typeorm connected!");
})
.catch((err) => {
    console.error("Error conneting to database with typeorm. Error: ", err);
});