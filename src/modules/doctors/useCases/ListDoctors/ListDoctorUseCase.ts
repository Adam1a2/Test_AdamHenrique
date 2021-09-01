import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { Doctor } from "../../infra/typeorm/entities/Doctor";
import { IDoctorsRepository } from "../../repositories/IDoctorRepository";



@injectable()
class ListDoctorUseCase{
    constructor(
        @inject("DoctorsRepository")
        private doctorsRepository: IDoctorsRepository
    ){}

    async execute():Promise<Doctor[]>{
        const doctors = await this.doctorsRepository.list();
        return doctors;
    }
}


export {ListDoctorUseCase }