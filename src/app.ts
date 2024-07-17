import postRoutes from "./routes/post.routes";
import { errorHandler } from "./middlewares/error.handler";
import express, { Express } from "express";
import 'express-async-errors';

export const app: Express = express();

app.use('/api', postRoutes)

app.use(errorHandler);

export default app;