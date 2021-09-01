import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDoctorUseCase } from "./ListDoctorUseCase";




class ListDoctorController{
    async handle(request: Request, response: Response):Promise<Response>{
        const listDoctorUseCase = container.resolve(ListDoctorUseCase)

        const all = await listDoctorUseCase.execute();

        return response.json(all)

    }
}

export { ListDoctorController }