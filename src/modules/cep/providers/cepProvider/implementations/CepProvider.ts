import { ICreateCepDTO } from "../../../dtos/ICreateCepDTO";
import { ICepProvider } from "../model/ICepProvider";
import ApiNodeCorreios from "node-correios";



class CepProvider implements ICepProvider{

    async getAddress(cep: string): Promise<ICreateCepDTO> {

        const correios = new ApiNodeCorreios();
        
        const address = await correios.consultaCEP({ cep });

        return address as ICreateCepDTO;
    }
       
}

export { CepProvider }