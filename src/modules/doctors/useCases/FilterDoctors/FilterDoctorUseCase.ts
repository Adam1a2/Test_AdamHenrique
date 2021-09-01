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
        
            if(name.length > 120){
                throw new AppError("The name cannot be longer than 120 characters.")
            }
            
        
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