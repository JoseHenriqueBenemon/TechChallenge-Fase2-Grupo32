import request from 'supertest';
import app from '../../../src/app';
import { describe, it, beforeAll, afterAll, expect } from "@jest/globals"; 
import { appDataSource } from '../../../src/configs/database';

beforeAll(async () => {
    await appDataSource.initialize();
});

afterAll(async () => {
    await appDataSource.destroy();
});

describe('User API', () => {
    it('should create a new user', async () => {
        const userData = { 
            name: 'User Create test', 
            email: 'user.create.test@teste.com', 
            password: 'TesteCreate@1234', 
            role: 'Student', 
            registration_number: '000001' 
        };

        const response = await request(app).post('/api/users').send(userData);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            name: userData.name,
            email: userData.email,
            role: userData.role,
            registration_number: userData.registration_number
        }));
    });

    it('should update an existing user', async () => {
        const createUserData = { 
            name: 'User Update test', 
            email: 'user.update.test@teste.com', 
            password: 'TesteUpdate@1234', 
            role: 'Student', 
            registration_number: '000002' 
        };

        const userResponse = await request(app).post('/api/users').send(createUserData);
        const user = userResponse.body;

        const loginResponse = await request(app).post('/api/users/signin').send({ email: createUserData.email, password: createUserData.password });
        const loginToken = loginResponse.body.token;

        const updateUserData = {
            name: "User Test Updated",
            email: "user.test.updated@test.com"
        };

        const updateResponse = await request(app)
            .put(`/api/users/${user.id}`)
            .send(updateUserData)
            .set('Authorization', `Bearer ${loginToken}`);
        
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.name).toBe(updateUserData.name);
        expect(updateResponse.body.email).toBe(updateUserData.email);
        expect(updateResponse.body.role).toBe(createUserData.role);
        expect(updateResponse.body.registration_number).toBe(createUserData.registration_number);
    });

    it('should delete an existing user', async () => {
        const createUserData = { 
            name: 'User Delete test', 
            email: 'user.Delete.test@teste.com', 
            password: 'TesteDelete@1234', 
            role: 'Teacher', 
            department: 'Administration' 
        };

        const userResponse = await request(app).post('/api/users').send(createUserData);
        const user = userResponse.body;

        const loginResponse = await request(app).post('/api/users/signin').send({ email: createUserData.email, password: createUserData.password });
        const loginToken = loginResponse.body.token;

        const deleteResponse = await request(app)
            .delete(`/api/users/${user.id}`)
            .set('Authorization', `Bearer ${loginToken}`);

        expect(deleteResponse.status).toBe(204);     
    });
});