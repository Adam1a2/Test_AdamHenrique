import { Request, Response } from "express";
import { container } from "tsyringe";
import { FilterDoctorUseCase } from "./FilterDoctorUseCase";




class FilterDoctorController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { name, crm, landline, cellPhone } = request.body;

        const filterDoctorUseCase = container.resolve(FilterDoctorUseCase)

        const all = await filterDoctorUseCase.execute({
            name,
            crm, 
            landline, 
            cellPhone, 
        });

        console.log(all)
        return response.json(all);
    }
}

export { FilterDoctorController }