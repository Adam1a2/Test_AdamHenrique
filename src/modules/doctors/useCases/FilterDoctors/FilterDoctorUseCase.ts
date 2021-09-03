import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICepsRepository } from "../../../cep/repositories/ICepsRepository";
import { IFilterDoctorDTO } from "../../dtos/IFilterDoctorDTO";
import { Doctor } from "../../infra/typeorm/entities/Doctor";
import { IDoctorsRepository } from "../../repositories/IDoctorRepository";


@injectable()
class FilterDoctorUseCase{
    constructor(
        @inject("DoctorsRepository")
        private doctorsRepository: IDoctorsRepository   
    ){}
    async execute({
        name,
        crm,
        landline,
        cellPhone,
    }: IFilterDoctorDTO): Promise<Doctor[]>{
        
        const filteredDoctors = await this.doctorsRepository.filterDoctors(
            name,
            crm,
            landline,
            cellPhone,
        );

        
        return filteredDoctors;
    }

}

export { FilterDoctorUseCase }