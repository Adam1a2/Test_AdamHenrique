import { inject, injectable } from 'tsyringe';
import { IFilterDoctorDTO } from '@modules/doctors/dtos/IFilterDoctorDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';

@injectable()
class FilterDoctorUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}
  async execute({
    name,
    crm,
    landline,
    cellPhone,
  }: IFilterDoctorDTO): Promise<Doctor[]> {
    const filteredDoctors = await this.doctorsRepository.filterDoctors(
      name,
      crm,
      landline,
      cellPhone,
    );

    return filteredDoctors;
  }
}

export { FilterDoctorUseCase };
