import { inject, injectable } from 'tsyringe';
import { ISpecialtiesRepository } from '@modules/specialties/repositories/ISpecialtiesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSpecialtyUseCase {
  constructor(
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  async execute(name: string): Promise<void> {
    const specialtyAlreadyExists = await this.specialtiesRepository.findByName(
      name,
    );

    if (specialtyAlreadyExists) {
      throw new AppError('Specialty already exists!');
    }

    this.specialtiesRepository.create(name);
  }
}

export { CreateSpecialtyUseCase };
