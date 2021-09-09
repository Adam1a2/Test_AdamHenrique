import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICreateCepDTO } from '@modules/cep/dtos/ICreateCepDTO';

interface ICepsRepository {
  create(cep: ICreateCepDTO): Promise<Cep>;
  findByCep(cep: string): Promise<Cep | undefined>;
  findById(id: string): Promise<Cep | undefined>;
  list(): Promise<Cep[]>;
}

export { ICepsRepository };
