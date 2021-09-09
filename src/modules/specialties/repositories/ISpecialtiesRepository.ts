import { Specialty } from '../infra/typeorm/entities/specialty';

interface ISpecialtiesRepository {
  findByName(name: string): Promise<Specialty | undefined>;
  findById(id: string): Promise<Specialty | undefined>;
  list(): Promise<Specialty[]>;
  create(name: string): Promise<void>;
  findSpecialties(names: string[]): Promise<Specialty[]>;
}

export { ISpecialtiesRepository };
