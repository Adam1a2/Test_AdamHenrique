import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecialtiesRepository } from "../../../specialties/repositories/ISpecialtiesRepository";
import { Doctor } from "../../infra/typeorm/entities/Doctor";
import { IDoctorsRepository } from "../../repositories/IDoctorRepository";


@injectable()
class FilterDoctorSpecialtyUseCase{
    constructor(
        @inject("DoctorsRepository")
        private doctorsRepository: IDoctorsRepository,
        @inject("SpecialtiesRepository")
        private specialtiesRepository: ISpecialtiesRepository
    ){}
    async execute(specialtyName: string):Promise<Doctor[]>{

        const specialty = await this.specialtiesRepository.findByName(specialtyName);

        if(!specialty){
            throw new AppError("this specialty doesn't exist");
        }

        const doctors = await this.doctorsRepository.findBySpecialty(specialty)
        
       

        return doctors;
    }

}

export { FilterDoctorSpecialtyUseCase }