import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../../../../shared/infra/routes/app';


let connection: Connection;

describe("GET /doctors", () => {
    beforeAll(async () => {
      connection = await createConnection();
      await connection.runMigrations();

      const doctor = {
            name: "test",
            crm: '1234567',
            cellPhone: '31999119911',
            landline: '40028922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        await request(app)
        .post('/doctors')
        .send(doctor)
        
    });
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.close();
    });
  
  
    it("should be able to list all doctors", async () => {  
      const response = await request(app).get("/doctors")
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  
  })