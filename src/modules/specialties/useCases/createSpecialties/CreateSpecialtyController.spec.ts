import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../../../../shared/infra/routes/app';


let connection: Connection;

describe("POST /specialties", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });


  it("should able to create a new specialty", async () => {
    const specialty = {
      name: "test",
    };

    const response = await request(app)
      .post("/specialties")
      .send(specialty)
      

    expect(response.status).toBe(201)
    });

  it("should not be able to create a new specialty with name exists", async () => {
    const specialty = {
      name: "test",
    };

    const response = await request(app)
      .post("/specialties")
      .send(specialty)
      

    expect(response.status).toBe(400)
  });
})