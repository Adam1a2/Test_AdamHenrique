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
            landline: '40028922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const response  = await request(app)
        .post('/doctors')
        .send(doctor)
        
        expect(doctor.specialties).toHaveLength(2)
        expect(response.status).toBe(201)
    });

    it('should not be able to register a new doctor with a invalid cep format', async () => {
        
        const doctor = {
            name: "test",
            crm: '1214531',
            cellPhone: '31999939988',
            landline: '40028922',
            cep: '3517250',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const {body}  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.status).toBe('error');
        expect(body.type).toBe("validation")
    });

    it('should not be able to register a new doctor with a non-existing zip code', async () => {
        
        const doctor = {
            name: "test",
            crm: '1244531',
            cellPhone: '31899939988',
            landline: '40088922',
            cep: '11111111',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const {body}  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.message).toBe('Cep does not exist');
    });

    it('should not be able to register a new doctor with a invalid crm format', async () => {
        
        const doctor = {
            name: "test",
            crm: '1214537888',
            cellPhone: '31997939988',
            landline: '40028722',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const {body}  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.status).toBe('error');
        expect(body.type).toBe("validation")
    });

    it('should not be able to register a new doctor with a crm exists', async () => {
        
        const doctor = {
            name: "test",
            crm: '1214531',
            cellPhone: '31991939988',
            landline: '40028122',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const { body }  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.message).toBe('Doctor Already Exists');
    });

    it('should not be able to register a new doctor with a invalid landline format', async () => {
        
        const doctor = {
            name: "test",
            crm: '1294531',
            cellPhone: '31991989988',
            landline: '400285922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const { body }  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.status).toBe('error');
        expect(body.type).toBe("validation")
    });

    it('should not be able to register a new doctor with a landline exists', async () => {
        
        const doctor = {
            name: "test",
            crm: '1114531',
            cellPhone: '31991939988',
            landline: '40028922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const { body }  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.message).toBe('Landline Already Exists');
    });

    it('should not be able to register a new doctor with a invalid cellPhone format', async () => {
        
        const doctor = {
            name: "test",
            crm: '1294531',
            cellPhone: '319918989988',
            landline: '40025922',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const { body }  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.status).toBe('error');
        expect(body.type).toBe("validation")
    });

    it('should not be able to register a new doctor with a cellPhone exists', async () => {
        
        const doctor = {
            name: "test",
            crm: '1114131',
            cellPhone: '31999939988',
            landline: '40028911',
            cep: '68907390',
            specialties: ['Alergologia', 'Angiologia'],
        };

        const { body }  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.message).toBe('cellPhone Already Exists');
    });

    it('should not be able to register a new doctor with just one specialty ', async () => {
        
        const doctor = {
            name: "test",
            crm: '1211131',
            cellPhone: '31922939988',
            landline: '40021122',
            cep: '68907390',
            specialties: ['Alergologia'],
        };

        const {body}  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        expect(body.status).toBe('error');
        expect(body.message).toBe('specialties must contain at least 2 items');
    });

    it('should not be able to register a new doctor with a specialty unregistered', async () => {
        
        const doctor = {
            name: "test",
            crm: '1211131',
            cellPhone: '31922939988',
            landline: '40021122',
            cep: '68907390',
            specialties: ['Alergologia', 'test'],
        };

        const {body}  = await request(app)
        .post('/doctors')
        .send(doctor)
        .expect(400)
        
        
        expect(body.message).toBe('Specialties were not found');
    });






})