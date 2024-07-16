import postRoutes from "./routes/post.routes";
import { errorHandler } from "./errorHandler";
import express, { Express, Request, Response} from "express";

export const app: Express = express();

app.use(errorHandler);

app.use('/api', postRoutes)

export default app;
