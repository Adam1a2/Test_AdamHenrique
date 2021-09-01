import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateCepUseCase } from "../../../cep/useCases/createCeps/CreateCepUseCase";
import { ISpecialtiesRepository } from "../../../specialties/repositories/ISpecialtiesRepository";
import { IDoctorUpdateDTO } from "../../dtos/IUpdateDoctorDTO";
import { Doctor } from "../../infra/typeorm/entities/Doctor";
import { IDoctorsRepository } from "../../repositories/IDoctorRepository";




@injectable()
class UpdateDoctorUseCase{
    constructor(
        @inject("DoctorsRepository")
        private doctorsRepository: IDoctorsRepository,
        @inject("CreateCepUseCase")
        private createCepUseCase: CreateCepUseCase,
        @inject("SpecialtiesRepository")
        private specialtiesRepository: ISpecialtiesRepository
    ){}
    async execute({
        id,
        name,
        crm,
        landline,
        cellPhone,
        cep,
        specialties
    }: IDoctorUpdateDTO): Promise<Doctor>{

        const DoctorFound = await this.doctorsRepository.findById(id);

        if(!DoctorFound){
            throw new AppError("Doctor doesn't exist!")
        }

        if(name){
            DoctorFound.name = name;
        }

       if(crm){
           
            const CrmAlreadyExists = await this.doctorsRepository.findByCrm(crm);

            if(CrmAlreadyExists){
                throw new AppError("Crm Already Exists");
            }

            DoctorFound.crm = crm;

       }

       if(landline){

            const landlineAlreadyExists = await this.doctorsRepository.findByLandline(landline);

            if(landlineAlreadyExists){
                throw new AppError("Landline Already Exists");
            }

            DoctorFound.landline = landline;

       }
        

        if(cellPhone){

            const cellPhoneAlreadyExists = await this.doctorsRepository.findByCellPhone(cellPhone);

            if(cellPhoneAlreadyExists){
                throw new AppError("cellPhone Already Exists");
            }

            DoctorFound.cellPhone = cellPhone;
        }

        if(specialties){

            if(specialties.length < 2){
                throw new AppError("doctor must have at least two specialties");
            }
    
            const specialtiesFound = await this.specialtiesRepository.findSpecialties(specialties)
    
            if(specialtiesFound.length < specialties.length){
                throw new AppError("Specialties were not found");
            }
    
            DoctorFound.specialties = specialtiesFound;
        }

        if(cep){
            const CepFound = await this.createCepUseCase.execute(cep);
            DoctorFound.cep = CepFound;
        }
        
        const updateDoctor = await this.doctorsRepository.update(DoctorFound);

        return updateDoctor;

    }

}

export { UpdateDoctorUseCase }