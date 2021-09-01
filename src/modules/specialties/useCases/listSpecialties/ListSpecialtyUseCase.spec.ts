import { SpecialtiesRepositoryInMemory } from "../../repositories/in-memory/SpecialtiesRepositoryInMemory";
import { ListSpecialtyUseCase } from "./ListSpecialtyUseCase";



let listSpecialtyUseCase: ListSpecialtyUseCase;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;

describe("List Specialties", () => {
    beforeEach(() => {
        specialtiesRepositoryInMemory = new SpecialtiesRepositoryInMemory();
        listSpecialtyUseCase = new ListSpecialtyUseCase(specialtiesRepositoryInMemory)   
    })

    it("should be able to list all specialties", async () =>{
    
        const specialties = await listSpecialtyUseCase.execute();

        expect(specialties).toHaveLength(3)
    })

});
