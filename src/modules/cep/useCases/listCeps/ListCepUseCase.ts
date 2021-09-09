import { inject, injectable } from 'tsyringe';
import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICepsRepository } from '@modules/cep/repositories/ICepsRepository';

@injectable()
class ListCepUseCase {
  constructor(
    @inject('CepsRepository')
    private cepsRepository: ICepsRepository,
  ) {}

  async execute(): Promise<Cep[]> {
    const ceps = await this.cepsRepository.list();
    return ceps;
  }
}

export { ListCepUseCase };
