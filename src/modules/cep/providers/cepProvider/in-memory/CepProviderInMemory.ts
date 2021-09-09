import { ICreateCepDTO } from '@modules/cep/dtos/ICreateCepDTO';
import { ICepProvider } from '@modules/cep/providers/cepProvider/model/ICepProvider';

class CepProviderInMemory implements ICepProvider {
  async getAddress(cep: string): Promise<ICreateCepDTO> {
    const createCep: ICreateCepDTO = {} as ICreateCepDTO;

    createCep.bairro = '';
    createCep.cep = cep;
    createCep.complemento = '';
    createCep.ddd = '';
    createCep.gia = '';
    createCep.ibge = '';
    createCep.localidade = '';
    createCep.logradouro = '';
    createCep.siafi = '';
    createCep.uf = '';

    return createCep;
  }
}

export { CepProviderInMemory };
