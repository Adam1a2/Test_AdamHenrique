import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { IDoctorDTO } from '@modules/doctors/dtos/IDoctorDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import { ISpecialtiesRepository } from '@modules/specialties/repositories/ISpecialtiesRepository';

@injectable()
class CreateDoctorUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('CreateCepUseCase')
    private createCepUseCase: CreateCepUseCase,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute({
    name,
    crm,
    landline,
    cellPhone,
    cep,
    specialties,
  }: IDoctorDTO): Promise<Doctor> {
    const DoctorAlreadyExists = await this.doctorsRepository.findByCrm(crm);

    if (DoctorAlreadyExists) {
      throw new AppError('Doctor Already Exists');
    }

    const landlineAlreadyExists = await this.doctorsRepository.findByLandline(
      landline,
    );

    if (landlineAlreadyExists) {
      throw new AppError('Landline Already Exists');
    }

    const cellPhoneAlreadyExists = await this.doctorsRepository.findByCellPhone(
      cellPhone,
    );

    if (cellPhoneAlreadyExists) {
      throw new AppError('cellPhone Already Exists');
    }

    if (specialties.length < 2) {
      throw new AppError('doctor must have at least two specialties');
    }

    const specialtiesFound = await this.specialtiesRepository.findSpecialties(
      specialties,
    );

    if (specialtiesFound.length < specialties.length) {
      throw new AppError('Specialties were not found');
    }

    const CepFound = await this.createCepUseCase.execute(cep);

    const doctor = await this.doctorsRepository.create({
      name,
      crm,
      landline,
      cellPhone,
      cep: CepFound,
      specialties: specialtiesFound,
    });
    return doctor;
  }
}

export { CreateDoctorUseCase };
