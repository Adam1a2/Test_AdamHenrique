import { inject, injectable } from 'tsyringe';
import { ICepsRepository } from '@modules/cep/repositories/ICepsRepository';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';

@injectable()
class FilterDoctorCepUseCase {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('CepsRepository')
    private cepsRepository: ICepsRepository,
    @inject('CreateCepUseCase')
    private createCepUseCase: CreateCepUseCase,
  ) {}

  async execute(cep: string): Promise<Doctor[]> {
    const CepFound = await this.createCepUseCase.execute(cep);

    const doctors = await this.doctorsRepository.findByCep(CepFound);

    return doctors;
  }
}

export { FilterDoctorCepUseCase };
