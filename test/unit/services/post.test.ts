import request from 'supertest';
import app from '../../../src/app';
import { describe, it, beforeAll, afterAll, expect } from "@jest/globals"; 
import { appDataSource } from '../../../src/configs/database';
import { addHours } from '../../../src/utils/helper.util';

beforeAll(async () => {
    await appDataSource.initialize();
});

afterAll(async () => {
    await appDataSource.destroy();
});

describe('Post API', () => {
    it('should create a new post', async () => {
        const userPostData = { 
            name: 'Post Create test', 
            email: 'post.create.test@teste.com', 
            password: 'TestePostCreate@1234', 
            role: 'Teacher', 
            department: 'Biology' 
        };

        const responseUser = await request(app).post('/api/users').send(userPostData);
        
        expect(responseUser.statusCode).toBe(201);
        expect(responseUser.body).toEqual(expect.objectContaining({
            name: userPostData.name,
            email: userPostData.email,
            role: userPostData.role,
            department: userPostData.department
        }));

        const loginResponse = await request(app).post('/api/users/signin').send({ email: userPostData.email, password: userPostData.password });
        const loginToken = loginResponse.body.token;        

        const postPostData = {
            title: "Teste Criação Aula",
            description: "Teste Criação Aula - aula de biologia",
            category_subject: "Biology",
            status: "Active",
            limit_date: "2024-08-10"
        };

        const responsePost = await request(app)
            .post('/api/posts')
            .send(postPostData)
            .set('Authorization', `Bearer ${loginToken}`);

        const expectedLimitDate = addHours(postPostData.limit_date, 3).toLocaleDateString("pt-BR");
    
        expect(responsePost.body).toEqual(expect.objectContaining({
            title: postPostData.title,
            description: postPostData.description,
            category_subject: postPostData.category_subject,
            status: postPostData.status,
            limit_date: expectedLimitDate
        }));

        expect(responsePost.body).toHaveProperty('id');
        expect(responsePost.body).toHaveProperty('created_at');
        expect(responsePost.body).toHaveProperty('updated_at');
        expect(responsePost.body).toHaveProperty('user_id');
    });

    it('Should update an existing post', async () => {
        const user = {
            name: "Nome",
            email: "nomedeusuario@provedor.com",
            password: "Teste!234",
            role: "Teacher",
            department: "Administração"
        }
        
        const userResponse = await request(app).post('/api/users').send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toEqual(expect.objectContaining({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department
        }));

        const loginResponse = await request(app).post('/api/users/signin').send({ email: user.email, password: user.password });
        const loginToken = loginResponse.body.token;

        const post = {
            title: "Titulo",
            description: "Descrição",
            category_subject: "Portuguese",
            status: "Active",
            limit_date: "2024-09-01"
        }

        const responsePost = await request(app).post('/api/posts').send(post).set('Authorization', `Bearer ${loginToken}`);

        
        const updatedPost = {
            title: "Title",
            description: "Description",
            category_subject: "English",
            limit_date: "2024-10-01"
        }

        const expectedLimitDate = addHours(updatedPost.limit_date, 3).toLocaleDateString("pt-BR");
        
        const putResponse = await request(app).put(`/api/posts/${responsePost.body.id}`).send(updatedPost).set('Authorization', `Bearer ${loginToken}`);

        expect(putResponse.status).toBe(200);
        expect(putResponse.body.title).toBe(updatedPost.title);
        expect(putResponse.body.description).toBe(updatedPost.description);
        expect(putResponse.body.category_subject).toBe(updatedPost.category_subject);
        expect(putResponse.body.status).toBe(post.status);
        expect(putResponse.body.limit_date).toBe(expectedLimitDate);
    });

    it('Should delete an existing post', async () => {
        const user = {
            name: "Nome Sobrenome",
            email: "usuario@provedor.com",
            password: "Teste!234",
            role: "Teacher",
            department: "Administração"
        }

        const userResponse = await request(app).post('/api/users').send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toEqual(expect.objectContaining({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department
        }));

        const loginResponse = await request(app).post('/api/users/signin').send({ email: user.email, password: user.password });
        const loginToken = loginResponse.body.token;

        const post =  {
            title: "Título",
            description: "Descrição",
            category_subject: "Portuguese",
            status: "Active",
            limit_date: "2024-10-01"
        };

        const postResponse = await request(app).post('/api/posts').send(post).set('Authorization', `Bearer ${loginToken}`);
        const createdPost = postResponse.body;
        const deleteResponse = await request(app).delete(`/api/posts/${createdPost.id}`).set('Authorization', `Bearer ${loginToken}`);

        expect(deleteResponse.status).toBe(204);
    });
});