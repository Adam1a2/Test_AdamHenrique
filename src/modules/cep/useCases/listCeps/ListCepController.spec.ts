import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '@shared/infra/routes/app';

let connection: Connection;

describe('GET /ceps', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all specialties', async () => {
    const cep = { cep: '35170250' };

    await request(app).post('/ceps').send(cep);

    const response = await request(app).get('/ceps');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
