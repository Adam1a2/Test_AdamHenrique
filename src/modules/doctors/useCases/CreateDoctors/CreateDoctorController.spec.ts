import { app } from '../../../../shared/infra/routes/app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

let connection: Connection;

describe('POST /doctors', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
    it('should be able to register a new doctor', async () => {
        const doctor = {
            name: "test",
            crm: '1214531',
            cellPhone: '31999939988',
            cep: '35163143',
            specialties: ['Angiologia', 'Cardiologia infantil'],
        };
        const { body } = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(201);

        expect(body.doctor).toHaveProperty('id');
        expect(body.doctor.crm).toEqual(doctor.crm);
        expect(body.doctor.cellPhone).toEqual(doctor.cellPhone);
        expect(body.doctor.cep).toHaveProperty('id');
        expect(body.doctor.specialties).toHaveLength(2);
    });
})