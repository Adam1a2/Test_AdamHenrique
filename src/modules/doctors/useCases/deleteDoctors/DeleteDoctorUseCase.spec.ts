import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { CepProviderInMemory } from '@modules/cep/providers/cepProvider/in-memory/CepProviderInMemory';
import { CepsRepositoryInMemory } from '@modules/cep/repositories/in-memory/CepsRepositoryInMemory';
import { DeleteDoctorUseCase } from './DeleteDoctorUseCase';
import { CreateDoctorUseCase } from '../CreateDoctors/CreateDoctorUseCase';
import { SpecialtiesRepositoryInMemory } from '@modules/specialties/repositories/in-memory/SpecialtiesRepositoryInMemory';
import { DoctorsRepositoryInMemory } from '@modules/doctors/repositories/in-memory/DoctorsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let deleteDoctorUseCase: DeleteDoctorUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

describe('Delete a Doctor', () => {
  beforeEach(() => {
    cepsRepositoryInMemory = new CepsRepositoryInMemory();
    specialtiesRepositoryInMemory = new SpecialtiesRepositoryInMemory();
    doctorsRepositoryInMemory = new DoctorsRepositoryInMemory();
    cepProviderInMemory = new CepProviderInMemory();

    createCepUseCase = new CreateCepUseCase(
      cepsRepositoryInMemory,
      cepProviderInMemory,
    );

    createDoctorUseCase = new CreateDoctorUseCase(
      doctorsRepositoryInMemory,
      createCepUseCase,
      specialtiesRepositoryInMemory,
    );

    deleteDoctorUseCase = new DeleteDoctorUseCase(doctorsRepositoryInMemory);
  });

  it('should not be able to exclude a doctor who is not registered', async () => {
    await expect(deleteDoctorUseCase.execute('312321')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to delete a doctor', async () => {
    const createdDoctor = await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234561',
      cellPhone: '3199999999',
      landline: '313824242424',
      cep: '35163143',
      specialties: ['Alergologia', 'Buco maxilo'],
    });

    await deleteDoctorUseCase.execute(createdDoctor.id);

    await expect(
      deleteDoctorUseCase.execute(createdDoctor.id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
