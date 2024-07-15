import { app } from "./app";
import { env } from "./configs/env-config";

app.listen({
    host: env.HOST, 
    port: env.PORT
    }, () => {
    console.log(`Server is running on http://${env.HOST}:${env.PORT}`);
});
