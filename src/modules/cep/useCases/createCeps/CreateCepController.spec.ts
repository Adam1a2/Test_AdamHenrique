import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '@shared/infra/routes/app';

let connection: Connection;

describe('POST /ceps', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  //   it("should not be able to create a new zip code with an invalid format", async () => {
  //     const cep = { cep: "3451709250" };

  //     const response = await request(app)
  //       .post("/ceps")
  //       .send(cep)
  //       .expect(400)

  //       expect(response).toStrictEqual({
  //         status: 'error',
  //         type: 'validation',
  //         message: `cep with value "${cep.cep}" fails to match the required pattern: /^\\d{8}$/`,
  //       });

  //   });

  it('should be able to create a new cep', async () => {
    const cep = { cep: '35170250' };

    const response = await request(app).post('/ceps').send(cep);

    expect(response.status).toBe(201);
  });
});
