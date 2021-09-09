import { CepProviderInMemory } from '@modules/cep/providers/cepProvider/in-memory/CepProviderInMemory';
import { CepsRepositoryInMemory } from '@modules/cep/repositories/in-memory/CepsRepositoryInMemory';
import { CreateCepUseCase } from '@modules/cep/useCases/createCeps/CreateCepUseCase';
import { DoctorsRepositoryInMemory } from '@modules/doctors/repositories/in-memory/DoctorsRepositoryInMemory';
import { SpecialtiesRepositoryInMemory } from '@modules/specialties/repositories/in-memory/SpecialtiesRepositoryInMemory';
import { CreateDoctorUseCase } from '../CreateDoctors/CreateDoctorUseCase';
import { FilterDoctorUseCase } from './FilterDoctorUseCase';

let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let filterDoctorUseCase: FilterDoctorUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

describe('Filter Doctors', () => {
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

    filterDoctorUseCase = new FilterDoctorUseCase(doctorsRepositoryInMemory);
  });

  it('should be able to filter Doctors by name', async () => {
    await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });

    await createDoctorUseCase.execute({
      name: 'test2',
      crm: '1234467',
      cellPhone: '31982452829',
      landline: '40029922',
      cep: '69922038',
      specialties: ['Alergologia', 'Buco maxilo'],
    });

    const doctors = await filterDoctorUseCase.execute({
      name: 'test',
    });

    expect(doctors).toHaveLength(1);
  });

  it('should be able to filter Doctors by landline', async () => {
    await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });

    await createDoctorUseCase.execute({
      name: 'test2',
      crm: '1234467',
      cellPhone: '31982452829',
      landline: '40029922',
      cep: '69922038',
      specialties: ['Alergologia', 'Buco maxilo'],
    });

    const doctors = await filterDoctorUseCase.execute({
      name: '',
      crm: '',
      landline: '40029922',
      cellPhone: '',
    });

    expect(doctors).toHaveLength(1);
  });

  it('should be able to filter Doctors by cellPhone', async () => {
    await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });

    await createDoctorUseCase.execute({
      name: 'test2',
      crm: '1234467',
      cellPhone: '31982452829',
      landline: '40029922',
      cep: '69922038',
      specialties: ['Alergologia', 'Buco maxilo'],
    });

    const doctors = await filterDoctorUseCase.execute({
      name: '',
      crm: '',
      landline: '',
      cellPhone: '31982452829',
    });

    expect(doctors).toHaveLength(1);
  });

  it('should be able to filter Doctors by crm', async () => {
    await createDoctorUseCase.execute({
      name: 'test',
      crm: '1234567',
      cellPhone: '31992452829',
      landline: '40028922',
      cep: '69922038',
      specialties: ['Cardiologia', 'Buco maxilo'],
    });

    await createDoctorUseCase.execute({
      name: 'test2',
      crm: '1234467',
      cellPhone: '31982452829',
      landline: '40029922',
      cep: '69922038',
      specialties: ['Alergologia', 'Buco maxilo'],
    });

    const doctors = await filterDoctorUseCase.execute({
      name: '',
      crm: '1234567',
      landline: '',
      cellPhone: '',
    });

    expect(doctors).toHaveLength(1);
  });
});
