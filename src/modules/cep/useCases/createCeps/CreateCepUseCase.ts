import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Cep } from "../../infra/typeorm/entities/Cep";
import { CepsRepository } from "../../infra/typeorm/repositories/CepsRepository";
import { ICepProvider } from "../../providers/cepProvider/model/ICepProvider";
import { ICepsRepository } from "../../repositories/ICepsRepository";





@injectable()
class CreateCepUseCase{
    
    constructor(
        @inject("CepsRepository")
        private cepsRepository: ICepsRepository,
        @inject("CepProvider")
        private cepProvider: ICepProvider
    ){}

    public async execute(cep: string): Promise<Cep>{


        if (cep.length != 8){
            throw new AppError("The zip code must have 8 digits");
        }
        
       const cepAlreadyExists = await this.cepsRepository.findByCep(cep);

        

        if(!cepAlreadyExists){
            const cepFound = await this.cepProvider.getAddress(cep);
            
            cepFound.cep = cepFound.cep.replace("-","")

            const cepCreated = await this.cepsRepository.create(cepFound);
    
            return cepCreated; 
        }

        return cepAlreadyExists;
    }

    
}


export { CreateCepUseCase };