import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '@shared/infra/routes/app';

let connection: Connection;

describe('GET /doctors/cep', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list doctors by name', async () => {
    const doctor = {
      name: 'test',
      crm: '1234567',
      cellPhone: '31999119911',
      landline: '40028922',
      cep: '35170250',
      specialties: ['Alergologia', 'Angiologia'],
    };

    await request(app).post('/doctors').send(doctor);

    const { body } = await request(app)
      .get('/doctors/select/')
      .query({ name: 'test' });

    expect(body).toHaveLength(1);
  });

  it('should not be able to list doctors by crm invalid format', async () => {
    const { body } = await request(app)
      .get('/doctors/select/')
      .query({ crm: '123456' })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });

  it('should be able to list doctors by crm', async () => {
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
      `/doctors/select?crm=${doctor.crm}`,
    );

    expect(body).toHaveLength(1);
  });

  it('should not be able to list doctors by landline invalid format', async () => {
    const { body } = await request(app)
      .get('/doctors/select/')
      .query({ landline: '4002892' })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });

  // it("should be able to list doctors by landline", async () => {

  //     const doctor = {
  //         name: "test",
  //         crm: '1234567',
  //         cellPhone: '31999119911',
  //         landline: '40028922',
  //         cep: '35170250',
  //         specialties: ['Alergologia', 'Angiologia'],
  //     };

  //     await request(app)
  //     .post('/doctors')
  //     .send(doctor)

  //     const { body } = await request(app)
  //     .get("/doctors/select/")
  //     .query({landline: "40028922"})

  //     expect(body).toHaveLength(1);
  // });

  it('should not be able to list doctors by landline cellPhone format', async () => {
    const { body } = await request(app)
      .get('/doctors/select/')
      .query({ cellPhone: '319923833444444444' })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });

  // it("should be able to list doctors by cellPhone", async () => {

  //     const doctor = {
  //         name: "test",
  //         crm: '1234567',
  //         cellPhone: '31999119911',
  //         landline: '40028922',
  //         cep: '35170250',
  //         specialties: ['Alergologia', 'Angiologia'],
  //     };

  //     await request(app)
  //     .post('/doctors')
  //     .send(doctor)

  //     const { body } = await request(app)
  //     .get("/doctors/select/")
  //     .query({cellPhone: "31992383342"})

  //     expect(body).toHaveLength(1);
  // });
});
