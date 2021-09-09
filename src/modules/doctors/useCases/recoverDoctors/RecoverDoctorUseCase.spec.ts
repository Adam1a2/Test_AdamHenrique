import { CepProviderInMemory } from '@modules/cep/providers/cepProvider/in-memory/CepProviderInMemory';
import { CepsRepositoryInMemory } from '@modules/cep/repositories/in-memory/CepsRepositoryInMemory';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { DoctorsRepositoryInMemory } from '@modules/doctors/repositories/in-memory/DoctorsRepositoryInMemory';
import { SpecialtiesRepositoryInMemory } from '@modules/specialties/repositories/in-memory/SpecialtiesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateDoctorUseCase } from '../CreateDoctors/CreateDoctorUseCase';
import { DeleteDoctorUseCase } from '../deleteDoctors/DeleteDoctorUseCase';
import { RecoverDoctorUseCase } from './RecoverDoctorUseCase';

let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let deleteDoctorUseCase: DeleteDoctorUseCase;
let recoverDoctorUseCase: RecoverDoctorUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

let createdDoctor: Doctor;

describe('Recover Doctor', () => {
  beforeEach(async () => {
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

    recoverDoctorUseCase = new RecoverDoctorUseCase(doctorsRepositoryInMemory);

    deleteDoctorUseCase = new DeleteDoctorUseCase(doctorsRepositoryInMemory);

    createdDoctor = await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });
  });

  it('should not be able to recover a doctor that has not been deleted', async () => {
    await expect(
      recoverDoctorUseCase.execute(createdDoctor.id),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to recover a doctor', async () => {
    await deleteDoctorUseCase.execute(createdDoctor.id);

    const doctorRecovered = await recoverDoctorUseCase.execute(
      createdDoctor.id,
    );

    expect(doctorRecovered.id).toEqual(createdDoctor.id);
  });
});
