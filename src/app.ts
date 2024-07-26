import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.handler";
import { authValidation } from "./middlewares/authentication";
import 'express-async-errors';

export const app: Express = express();

app.use(express.json());
app.use(authValidation);

app.use('/api', postRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

export default app;