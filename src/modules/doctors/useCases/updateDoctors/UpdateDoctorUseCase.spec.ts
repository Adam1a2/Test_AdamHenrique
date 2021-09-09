import { CepProviderInMemory } from '@modules/cep/providers/cepProvider/in-memory/CepProviderInMemory';
import { CepsRepositoryInMemory } from '@modules/cep/repositories/in-memory/CepsRepositoryInMemory';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { DoctorsRepositoryInMemory } from '@modules/doctors/repositories/in-memory/DoctorsRepositoryInMemory';
import { SpecialtiesRepositoryInMemory } from '@modules/specialties/repositories/in-memory/SpecialtiesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateDoctorUseCase } from '../CreateDoctors/CreateDoctorUseCase';
import { UpdateDoctorUseCase } from './UpdateDoctorUseCase';

let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let updateDoctorUseCase: UpdateDoctorUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

let createdDoctor: Doctor;

describe('Update Doctor', () => {
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

    updateDoctorUseCase = new UpdateDoctorUseCase(
      doctorsRepositoryInMemory,
      createCepUseCase,
      specialtiesRepositoryInMemory,
    );

    createdDoctor = await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });
  });

  it("should not be able to update a doctor that doesn't exist", async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: 'dasdasdasdas77676466456456',
        crm: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be able update a doctor with name is passed', async () => {
    const response = await updateDoctorUseCase.execute({
      id: createdDoctor.id,
      name: 'test2',
    });

    expect(response.name).toEqual('test2');
  });

  it('should  be able update a doctor with landline is passed', async () => {
    const response = await updateDoctorUseCase.execute({
      id: createdDoctor.id,
      landline: '40028923',
    });

    expect(response.landline).toEqual('40028923');
  });

  it('should  be able update a doctor with cellPhone is passed', async () => {
    const response = await updateDoctorUseCase.execute({
      id: createdDoctor.id,
      cellPhone: '31992383341',
    });

    expect(response.cellPhone).toEqual('31992383341');
  });

  it('should  be able update a doctor with cep exists', async () => {
    const response = await updateDoctorUseCase.execute({
      id: createdDoctor.id,
      cep: '59631475',
    });

    expect(response.cep.cep).toEqual('59631475');
  });

  it('should  be able update a doctor with specialties is passed', async () => {
    const response = await updateDoctorUseCase.execute({
      id: createdDoctor.id,
      specialties: ['Cardiologia', 'Buco maxilo'],
    });

    expect(response.specialties).toHaveLength(2);
  });

  it('should not be able to update a doctor with a crm that is already registered', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        crm: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be possible to update a doctor with a zip code with less than or more than 8 digits. ', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        cep: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a doctor with a landline that is already registered ', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        landline: '40028922',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a doctor with a cellPhone that is already registered ', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        cellPhone: '31992452829',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a doctor with just one specialty', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        specialties: ['Cardiologia'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a doctor with an unregistered specialty', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: createdDoctor.id,
        specialties: ['Cardiologia', 'Clínico Geral'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
