import { ICreateCepDTO } from "../../../dtos/ICreateCepDTO";


interface ICepProvider{
    getAddress(cep: string): Promise<ICreateCepDTO>
}

export { ICepProvider}