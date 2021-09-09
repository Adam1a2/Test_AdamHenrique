import { ICreateCepDTO } from '@modules/cep/dtos/ICreateCepDTO';
import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICepsRepository } from '../ICepsRepository';

class CepsRepositoryInMemory implements ICepsRepository {
  ceps: Cep[] = [];

  async create({
    cep,
    complemento,
    logradouro,
    localidade,
    bairro,
    ddd,
    gia,
    ibge,
    siafi,
    uf,
  }: ICreateCepDTO): Promise<Cep> {
    const CreateCep = new Cep();

    Object.assign(CreateCep, {
      cep,
      complemento,
      logradouro,
      localidade,
      bairro,
      ddd,
      gia,
      ibge,
      siafi,
      uf,
    });

    this.ceps.push(CreateCep);
    return CreateCep;
  }

  async findByCep(cep: string): Promise<Cep> {
    const Findcep = this.ceps.find(cepFound => cepFound.cep === cep);
    return Findcep;
  }

  async findById(id: string): Promise<Cep> {
    const cep = this.ceps.find(cep => cep.id === id);
    return cep;
  }

  async list(): Promise<Cep[]> {
    const all = this.ceps;
    return all;
  }
}

export { CepsRepositoryInMemory };
