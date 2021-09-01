import { Request, Response } from "express";
import { container } from "tsyringe";
import { FilterDoctorSpecialtyUseCase } from "./FilterDoctorSpecialtyUseCase";



class FilterDoctorSpecialtyController{
    async handle(request: Request, response: Response): Promise<Response>{

        const { specialty } = request.body;

        const filterDoctorSpecialtyUseCase = container.resolve(FilterDoctorSpecialtyUseCase)

        const doctors = await filterDoctorSpecialtyUseCase.execute(specialty)

        return response.json(doctors).send();
    }
}

export{ FilterDoctorSpecialtyController }