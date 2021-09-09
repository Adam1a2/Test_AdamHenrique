import { container } from 'tsyringe';
import { CepsRepository } from '@modules/cep/infra/typeorm/repositories/CepsRepository';
import { CepProvider } from '@modules/cep/providers/cepProvider/implementations/CepProvider';
import { ICepProvider } from '@modules/cep/providers/cepProvider/model/ICepProvider';
import { ICepsRepository } from '@modules/cep/repositories/ICepsRepository';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { DoctorRepository } from '@modules/doctors/infra/typeorm/repositories/DoctorRepository';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import { SpecialtiesRepository } from '@modules/specialties/infra/typeorm/repositories/SpecialtiesRepository';
import { ISpecialtiesRepository } from '@modules/specialties/repositories/ISpecialtiesRepository';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorRepository,
);

container.registerSingleton<ICepsRepository>('CepsRepository', CepsRepository);

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);

container.registerSingleton<CreateCepUseCase>(
  'CreateCepUseCase',
  CreateCepUseCase,
);

container.registerSingleton<ICepProvider>('CepProvider', CepProvider);
