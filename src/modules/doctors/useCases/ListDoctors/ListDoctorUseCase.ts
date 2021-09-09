import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListDoctorUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute(): Promise<Doctor[]> {
    const doctors = await this.doctorsRepository.list();
    return doctors;
  }
}

export { ListDoctorUseCase };
