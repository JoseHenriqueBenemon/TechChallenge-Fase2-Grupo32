import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.handler";
import express, { Express } from "express";
import 'express-async-errors';

export const app: Express = express();

app.use(express.json());

app.use('/api', postRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

export default app;