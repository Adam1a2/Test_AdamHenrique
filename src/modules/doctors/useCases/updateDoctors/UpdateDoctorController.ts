import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateDoctorUseCase } from './UpdateDoctorUseCase';

class UpdateDoctorController{
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { name, crm, landline, cellPhone, cep, specialties } = request.body;

        const updateDoctorUseCase = container.resolve(UpdateDoctorUseCase);

        const updateDoctor = await updateDoctorUseCase.execute({
            id,
            name,
            crm,
            landline,
            cellPhone,
            cep,
            specialties
        })


        return response.status(201).json({doctor: updateDoctor});
    }
}

export{ UpdateDoctorController }