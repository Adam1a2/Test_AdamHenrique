import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../../../../shared/infra/routes/app';


let connection: Connection;

describe("GET /doctors/cep", () => {
    beforeAll(async () => {
      connection = await createConnection();
      await connection.runMigrations();
 
    });
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.close();
    });
  
  
    it("should be able to list doctors by cep", async () => {  
        const doctor = {
            name: "test",
            crm: '1234567',
            cellPhone: '31999119911',
            landline: '40028922',
            cep: '35170250',
            specialties: ['Alergologia', 'Angiologia'],
        };

        

        await request(app)
        .post('/doctors')
        .send(doctor)
        
        

        const { body } = await request(app)
        .get(`/doctors/ceps/${doctor.cep}`)
        

        expect(body).toHaveLength(1);
    });

    it("should not be able to list doctors by invalid zip code", async () => {  
      

      const { body } = await request(app)
      .get("/doctors/ceps/11111")
      .expect(400)
        
      expect(body.status).toBe('error');
      expect(body.type).toBe("validation")
  });

  it("should not be able to list doctors with a non-existing zip code", async () => {  
      

    const { body } = await request(app)
    .get("/doctors/ceps/11111111")
    .expect(400)
      
    expect(body.message).toBe('Cep does not exist');
});
  
  })