
import { AppError } from "../../../../shared/errors/AppError";
import { SpecialtiesRepositoryInMemory } from "../../repositories/in-memory/SpecialtiesRepositoryInMemory";
import { CreateSpecialtyUseCase } from "./CreateSpecialtyUseCase";

let createSpecialtyUseCase: CreateSpecialtyUseCase;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;


describe("Create Specialty", () => {
    beforeEach(() => {
        specialtiesRepositoryInMemory = new SpecialtiesRepositoryInMemory();
        createSpecialtyUseCase = new CreateSpecialtyUseCase(specialtiesRepositoryInMemory);
    })


    it("should be able to create a new specialty", async() =>{
        
        const name = "Specialty test";
        

        await createSpecialtyUseCase.execute(
            name,
        )

        const specialtyCreated = await specialtiesRepositoryInMemory.findByName(
            name
        )


        expect(specialtyCreated).toHaveProperty("id")
        
    }); 

    it("should not be able to create a new specialty with a name exists", async() =>{
        
        const name = "Specialty test";
        

        await createSpecialtyUseCase.execute(
            name,
        )

        await expect(
            createSpecialtyUseCase.execute(
                name,
            )
        ).rejects.toEqual(new AppError("Specialty already exists!"))

    }); 


})