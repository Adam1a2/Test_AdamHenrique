import { ICreateCepDTO } from '@modules/cep/dtos/ICreateCepDTO';

interface ICepProvider {
  getAddress(cep: string): Promise<ICreateCepDTO>;
}

export { ICepProvider };
