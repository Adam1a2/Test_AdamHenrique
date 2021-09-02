import { Request, Response } from "express";
import { container } from "tsyringe";
import { FilterDoctorCepUseCase } from "./FilterDoctorCepUseCase";




class FilterDoctorCepController{
    async handle(request: Request, response: Response): Promise<Response>{
        
        const {cep} = request.params;
        
        const filterDoctorCepUseCase = container.resolve(FilterDoctorCepUseCase)

        const doctors = await filterDoctorCepUseCase.execute(cep)

        return response.json(doctors).send();
    }

}

export{ FilterDoctorCepController }