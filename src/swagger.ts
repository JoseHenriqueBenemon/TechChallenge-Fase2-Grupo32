import swaggerAutogen from 'swagger-autogen';
import { env } from './configs/env-config';

const doc = {
    info: {
        title: 'TechChallenge',
        version: 'v1.0.0',
        description: 'Documentação grupo 32',
    },
    servers: [
        {
            url: `http://${env.HOST}:${env.PORT}`,
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
        schemas: {
            PostRequest: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }, 
                    title: { type: 'string' }, 
                    description: { type: 'string' }, 
                    category_subject: { type: 'string' }, 
                    status: { type: 'string' }, 
                    limit_date: { type: 'string', format: 'date-time' },
                    user: { $ref: '#/components/schemas/UserRequest' }, 
                },
            },
            UserRequest: {
                type: 'object',
                properties: {
                    name: { type: 'string' }, 
                    email: { type: 'string' }, 
                    password: { type: 'string' }, 
                    role: { type: 'string' },  
                    registration_number: { type: ['string', 'null'] }, 
                    department: { type: ['string', 'null'] }, 
                    posts: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/PostRequest' },
                    },
                },
            },
        },
    },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/post.routes.ts', './routes/user.routes.ts'];

swaggerAutogen({
  openapi: '3.0.0'
})(outputFile, endpointsFiles, doc);