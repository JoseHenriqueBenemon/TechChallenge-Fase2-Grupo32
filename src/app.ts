import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.handler";
import { authValidation } from "./middlewares/authentication";
import swaggerUi from 'swagger-ui-express';
import swaggerOutPut from "./swagger_output.json";
import 'express-async-errors';
import cors from 'cors';

export const app: Express = express();

app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutPut));

app.use(express.json());
app.use(authValidation);

app.use('/api', postRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

export default app;