import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../../../../shared/infra/routes/app';


let connection: Connection;

describe("GET /specialties", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });


  it("should be able to list all specialties", async () => {
    const specialty = {
      name: "test",
    };

    await request(app)
    .post("/specialties")
    .send(specialty)
    
    const response = await request(app).get("/specialties")

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

})