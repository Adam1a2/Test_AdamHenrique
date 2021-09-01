import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDoctorUseCase } from './CreateDoctorUseCase';



class CreateDoctorController{
    async handle(request: Request, response:Response): Promise<Response>{

        const { name, crm, landline, cellPhone, cep, specialties}  = request.body;

        const createDoctorUseCase = container.resolve(CreateDoctorUseCase);

        await createDoctorUseCase.execute({
            name, 
            crm, 
            landline, 
            cellPhone, 
            cep, 
            specialties
        })

        return response.status(201).send();
    }
}

export { CreateDoctorController}