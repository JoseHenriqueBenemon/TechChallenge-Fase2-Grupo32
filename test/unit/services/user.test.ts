import request from 'supertest';
import app from '../../../src/app';
import { appDataSource } from '../../../src/configs/database';

beforeAll(async () => {
    await appDataSource.initialize(); // Inicializa o DataSource antes dos testes
});

afterAll(async () => {
    await appDataSource.destroy(); // Fecha a conexão do DataSource após os testes
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

        const user = await request(app).post('/api/users').send(createUserData);

        const updateUserData = {
            name: "User Test Updated",
            email: "user.test.updated@test.com"
        };

        await request(app)
            .put(`/api/users/${user.body.id}`)
            .send(updateUserData)
            .expect(200)
            .then((response) => {
                expect(response.body.name).toBe(updateUserData.name);
                expect(response.body.email).toBe(updateUserData.email);
                expect(response.body.role).toBe(createUserData.role);
                expect(response.body.registration_number).toBe(createUserData.registration_number);
            })

    });
});