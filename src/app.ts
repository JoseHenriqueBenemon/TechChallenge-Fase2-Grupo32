import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.handler";
import { authValidation } from "./middlewares/authentication";
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import { env } from "./configs/env-config";

export const app: Express = express();
const port = 3000;

// Documento Swagger (OpenAPI) manualmente definido
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'TechChallenge',
    version: '1.0.0',
    description: 'Documentação grupo 32',
  },
  servers: [
    {
      url: `http://${env.HOST}:${env.PORT}`,
    },
  ],
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(authValidation);

app.use('/api', postRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

export default app;