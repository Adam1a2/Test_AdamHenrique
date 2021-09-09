import { CepProviderInMemory } from '@modules/cep/providers/cepProvider/in-memory/CepProviderInMemory';
import { CepsRepositoryInMemory } from '@modules/cep/repositories/in-memory/CepsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCepUseCase } from './CreateCepUseCase';

let createCepUseCase: CreateCepUseCase;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let cepProviderInMemory: CepProviderInMemory;

describe('Create Cep', () => {
  beforeEach(() => {
    cepsRepositoryInMemory = new CepsRepositoryInMemory();
    cepProviderInMemory = new CepProviderInMemory();
    createCepUseCase = new CreateCepUseCase(
      cepsRepositoryInMemory,
      cepProviderInMemory,
    );
  });

  it('it must not be possible to register a zip code with less or more than 8 digits', async () => {
    await expect(createCepUseCase.execute('501781838')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
