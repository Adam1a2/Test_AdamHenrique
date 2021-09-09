import { getRepository, Repository } from 'typeorm';
import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICepsRepository } from '@modules/cep/repositories/ICepsRepository';
import { ICreateCepDTO } from '@modules/cep/dtos/ICreateCepDTO';

class CepsRepository implements ICepsRepository {
  private repository: Repository<Cep>;

  constructor() {
    this.repository = getRepository(Cep);
  }

  async create({
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    ibge,
    gia,
    ddd,
    siafi,
  }: ICreateCepDTO): Promise<Cep> {
    const Cep = this.repository.create({
      cep,
      street: logradouro,
      complement: complemento,
      district: bairro,
      city: localidade,
      uf,
      ibge,
      gia,
      ddd,
      siafi,
    });

    await this.repository.save(Cep);

    return Cep;
  }

  async findById(id: string): Promise<Cep> {
    const cep = await this.repository.findOne({ id });
    return cep;
  }

  async list(): Promise<Cep[]> {
    const ceps = await this.repository.find();
    return ceps;
  }

  async findByCep(cep: string): Promise<Cep> {
    const cepFound = await this.repository.findOne({ cep });

    return cepFound;
  }
}

export { CepsRepository };
