import { ICreateCepDTO } from "../dtos/ICreateCepDTO";
import { Cep } from "../infra/typeorm/entities/Cep";


interface ICepsRepository{

    create(cep: ICreateCepDTO): Promise<Cep>
    findByCep(cep: string): Promise<Cep | undefined>;
    findById(id: string): Promise<Cep  | undefined>
    list(): Promise<Cep[]>

}

export { ICepsRepository }

