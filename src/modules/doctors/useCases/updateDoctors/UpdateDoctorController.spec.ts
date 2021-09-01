import { app } from '../../../../shared/infra/routes/app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { Doctor } from '../../infra/typeorm/entities/Doctor';

let connection: Connection;
let createdDoctor: Doctor;

describe('PUT /doctors/update', () => {
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

        const { body } = await request(app)
        .post('/doctors')
        .send(doctor)
        
  
      createdDoctor = body.doctor;

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should not be able to update a doctor with invalid crm format', async () => {
        const doctorUpdate = {
          crm: '12145311',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.status).toBe('error');
        expect(body.type).toBe('validation');
    });

    it('should not be able to update a doctors crm to an existing crm ', async () => {
        const doctorUpdate = {
          crm: '1234567',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
          expect(body.message).toBe('Crm Already Exists');
    });

    it('should not be able to update a doctor with invalid cellPhone format', async () => {
        const doctorUpdate = {
          cellPhone: '3199911991121',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.status).toBe('error');
        expect(body.type).toBe('validation');
    });

    it('should not be able to update a doctors crm to an existing cellPhone ', async () => {
        const doctorUpdate = {
          cellPhone: '31999119911',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
          expect(body.message).toBe('cellPhone Already Exists');
    });

    it('should not be able to update a doctor with invalid landline format', async () => {
        const doctorUpdate = {
          landline: '400289224444',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.status).toBe('error');
        expect(body.type).toBe('validation');
    });

    it('should not be able to update a doctors crm to an existing landline ', async () => {
        const doctorUpdate = {
          landline: '40028922',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.message).toBe('Landline Already Exists');
    });

    it('should not be able to update a doctor with invalid cep format', async () => {
        const doctorUpdate = {
          cep: '33311133311',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.status).toBe('error');
        expect(body.type).toBe('validation');
    });

    it('should not be able to update a doctor with a non-existing zip code', async () => {
        const doctorUpdate = {
          cep: '11111111',
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.message).toBe('Cep does not exist');
    });

    it('should not be able to update doctor with just one specialty', async () => {
        const doctorUpdate = {
            specialties: ['Alergologia']
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.status).toBe('error');
        expect(body.message).toBe('specialties must contain at least 2 items');
    });

    it('should not be able to update doctor with a specialty unregistered', async () => {
        const doctorUpdate = {
            specialties: ['Alergologia', 'Neurologista']
        };
    
        const { body } = await request(app)
          .put(`/doctors/update/${createdDoctor.id}`)
          .send(doctorUpdate)
          .expect(400);
    
        expect(body.message).toBe('Specialties were not found');
    });
    
});