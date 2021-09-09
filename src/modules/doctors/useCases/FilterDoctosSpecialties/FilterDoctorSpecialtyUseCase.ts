import { inject, injectable } from 'tsyringe';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import { ISpecialtiesRepository } from '@modules/specialties/repositories/ISpecialtiesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FilterDoctorSpecialtyUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}
  async execute(specialtyName: string): Promise<Doctor[]> {
    const specialty = await this.specialtiesRepository.findByName(
      specialtyName,
    );

    if (!specialty) {
      throw new AppError("this specialty doesn't exist");
    }

    const doctors = await this.doctorsRepository.findBySpecialty(specialty);

    return doctors;
  }
}

export { FilterDoctorSpecialtyUseCase };
