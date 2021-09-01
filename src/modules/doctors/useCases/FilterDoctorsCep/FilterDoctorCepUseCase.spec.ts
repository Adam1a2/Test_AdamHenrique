import { CepProviderInMemory } from "../../../cep/providers/cepProvider/in-memory/CepProviderInMemory";
import { CepsRepositoryInMemory } from "../../../cep/repositories/in-memory/CepsRepositoryInMemory";
import { CreateCepUseCase } from "../../../cep/useCases/createCeps/CreateCepUseCase";
import { SpecialtiesRepositoryInMemory } from "../../../specialties/repositories/in-memory/SpecialtiesRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { DoctorsRepositoryInMemory } from "../../repositories/in-memory/DoctorsRepositoryInMemory";
import { CreateDoctorUseCase } from "../CreateDoctors/CreateDoctorUseCase";
import { FilterDoctorCepUseCase } from "./FilterDoctorCepUseCase";



let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let filterDoctorCepUseCase: FilterDoctorCepUseCase

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

describe("Filter Doctos by CEP", () =>{
    beforeEach(() =>{
        cepsRepositoryInMemory = new CepsRepositoryInMemory();
        specialtiesRepositoryInMemory = new SpecialtiesRepositoryInMemory();
        doctorsRepositoryInMemory = new DoctorsRepositoryInMemory();
        cepProviderInMemory = new CepProviderInMemory();

        createCepUseCase = new CreateCepUseCase(
            cepsRepositoryInMemory,
            cepProviderInMemory
        )

        createDoctorUseCase = new CreateDoctorUseCase(
            doctorsRepositoryInMemory,
            createCepUseCase,
            specialtiesRepositoryInMemory
        )

        filterDoctorCepUseCase = new FilterDoctorCepUseCase(
            doctorsRepositoryInMemory,
            cepsRepositoryInMemory,
            createCepUseCase
        )
    })

    it('it should not be possible to register a doctor with a zip code with less than or more than 8 digits. ', async () => {
        await expect(
          createDoctorUseCase.execute({
          cellPhone: "31940400404",
          cep: "0331400",
          crm: "1244567",
          name: "test",
          landline: '38460608',
          specialties: ['Cardiologia', 'Buco maxilo'],
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to list Doctors by Cep", async() =>{
        await createDoctorUseCase.execute({
            name: "test",
            crm: "1234567",
            cellPhone: "31992452829",
            landline: "40028922",
            cep: "69922038",
            specialties:["Cardiologia", "Buco maxilo"]
        })

        await createDoctorUseCase.execute({
            name: "test2",
            crm: "1234467",
            cellPhone: "31982452829",
            landline: "40029922",
            cep: "69922038",
            specialties:["Cardiologia", "Buco maxilo"]
        })

        const doctors = await filterDoctorCepUseCase.execute("69922038");

        expect(doctors).toHaveLength(2);
    })



})