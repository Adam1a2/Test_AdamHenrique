import { v4 as uuidV4 } from 'uuid';
import { Specialty } from '@modules/specialties/infra/typeorm/entities/specialty';
import { ISpecialtiesRepository } from '../ISpecialtiesRepository';

class SpecialtiesRepositoryInMemory implements ISpecialtiesRepository {
  specialties: Specialty[] = [];

  constructor() {
    const alergologia = new Specialty();
    Object.assign(alergologia, {
      name: 'Alergologia',
    });

    const bucoMaxilo = new Specialty();

    Object.assign(bucoMaxilo, {
      name: 'Buco maxilo',
    });

    const cardiologia = new Specialty();

    Object.assign(cardiologia, {
      name: 'Cardiologia',
    });

    this.specialties.push(alergologia);
    this.specialties.push(bucoMaxilo);
    this.specialties.push(cardiologia);
  }

  async findByName(name: string): Promise<Specialty> {
    const specialty = this.specialties.find(
      specialty => specialty.name === name,
    );
    return specialty;
  }

  async findById(id: string): Promise<Specialty> {
    const specialty = this.specialties.find(specialty => specialty.id === id);
    return specialty;
  }

  async list(): Promise<Specialty[]> {
    const all = this.specialties;
    return all;
  }

  async create(name: string): Promise<void> {
    const specialty = new Specialty();

    Object.assign(specialty, {
      id: uuidV4(),
      name,
    });

    this.specialties.push(specialty);
  }

  async findSpecialties(names: string[]): Promise<Specialty[]> {
    const specialtiesFound = this.specialties.filter(findSpecialties =>
      names.find(findName => findName === findSpecialties.name),
    );

    return specialtiesFound;
  }
}

export { SpecialtiesRepositoryInMemory };
