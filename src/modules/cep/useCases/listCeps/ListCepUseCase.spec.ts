import { CepProviderInMemory } from "../../providers/cepProvider/in-memory/CepProviderInMemory";
import { CepsRepositoryInMemory } from "../../repositories/in-memory/CepsRepositoryInMemory";
import { CreateCepUseCase } from "../createCeps/CreateCepUseCase";
import { ListCepUseCase } from "./ListCepUseCase";


let createCepUseCase: CreateCepUseCase;
let listCepUseCase: ListCepUseCase;
let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;

describe("List Ceps", () =>{
    beforeEach(() =>{
        cepsRepositoryInMemory = new CepsRepositoryInMemory();
        cepProviderInMemory = new CepProviderInMemory();
        createCepUseCase = new CreateCepUseCase(
            cepsRepositoryInMemory,
            cepProviderInMemory
        )

        listCepUseCase = new ListCepUseCase(cepsRepositoryInMemory);
    })

    it("should be able to list all ceps", async() =>{
        await createCepUseCase.execute("35794970");
        await createCepUseCase.execute("39180970");
        await createCepUseCase.execute("39832971");
        
        const ceps = await listCepUseCase.execute();

        expect(ceps).toHaveLength(3);

    })
})