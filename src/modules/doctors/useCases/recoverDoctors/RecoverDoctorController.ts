import { Request, Response } from "express";
import { container } from "tsyringe";
import { RecoverDoctorUseCase } from "./RecoverDoctorUseCase";


class RecoverDoctorController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;

        const recoverDoctorUseCase = container.resolve(RecoverDoctorUseCase);

        await recoverDoctorUseCase.execute(id);
        
        return response.status(200).send();
    }
}

export{ RecoverDoctorController }