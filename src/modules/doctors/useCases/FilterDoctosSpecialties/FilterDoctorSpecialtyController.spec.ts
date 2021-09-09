import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '@shared/infra/routes/app';

let connection: Connection;

describe('GET /doctors/specialty', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list doctors by specialty', async () => {
    const doctor = {
      name: 'test',
      crm: '1234567',
      cellPhone: '31999119911',
      landline: '40028922',
      cep: '35170250',
      specialties: ['Alergologia', 'Angiologia'],
    };

    await request(app).post('/doctors').send(doctor);

    const { body } = await request(app).get(
      `/doctors/specialty/${doctor.specialties[0]}`,
    );

    expect(body).toHaveLength(1);
  });

  it('should not be able to list doctors by invalid specialty', async () => {
    const { body } = await request(app)
      .get('/doctors/specialty/Neurocirurgiao')
      .expect(400);

    expect(body.message).toBe("this specialty doesn't exist");
  });
});
