import { inject, injectable } from "tsyringe";
import { Cep } from "../../infra/typeorm/entities/Cep";
import { ICepsRepository } from "../../repositories/ICepsRepository";



@injectable()
class ListCepUseCase{
    constructor(
        @inject("CepsRepository")
        private cepsRepository: ICepsRepository
    ){}

    async execute():Promise<Cep[]>{

        const ceps = await this.cepsRepository.list();
        return ceps;
    }

}

export {ListCepUseCase};