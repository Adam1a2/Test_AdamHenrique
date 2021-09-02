import { app } from '../../../../shared/infra/routes/app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe('GET /doctors/recover', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it('should be able to recover a doctor', async () => {
        const doctor = {
            name: "test",
            crm: '1234567',
            cellPhone: '31999119911',
            landline: '40028922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };
    
        const { body } = await request(app)
          .post('/doctors')
          .send(doctor)
          .expect(201);
    
        await request(app).delete(`/doctors/delete/${body.doctor.id}`).expect(204);

        await request(app).get(`/doctors/recover/${body.doctor.id}`).expect(200);
    });

    it('should not be able to recover a doctor who has not yet been excluded', async () => {
        
        const doctor = {
            name: "test",
            crm: '1234467',
            cellPhone: '31949119911',
            landline: '40048922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };
    
        const { body } = await request(app)
          .post('/doctors')
          .send(doctor)
          .expect(201);
        
        await request(app).get(`/doctors/recover/${body.doctor.id}`).expect(400);
      });

    
})