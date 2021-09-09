import { inject, injectable } from 'tsyringe';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class RecoverDoctorUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute(id: string): Promise<Doctor> {
    const doctorDeleted = await this.doctorsRepository.findDeleted(id);

    if (!doctorDeleted) {
      throw new AppError('Doctor is not deleted');
    }

    const doctorRecover = await this.doctorsRepository.recover(doctorDeleted);
    return doctorRecover;
  }
}

export { RecoverDoctorUseCase };
