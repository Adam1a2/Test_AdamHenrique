import { CepProviderInMemory } from "../../../cep/providers/cepProvider/in-memory/CepProviderInMemory";
import { CepsRepositoryInMemory } from "../../../cep/repositories/in-memory/CepsRepositoryInMemory";
import { CreateCepUseCase } from "../../../cep/useCases/createCeps/CreateCepUseCase";
import { SpecialtiesRepositoryInMemory } from "../../../specialties/repositories/in-memory/SpecialtiesRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { DoctorsRepositoryInMemory } from "../../repositories/in-memory/DoctorsRepositoryInMemory";
import { CreateDoctorUseCase } from "../CreateDoctors/CreateDoctorUseCase";
import { FilterDoctorSpecialtyUseCase } from "./FilterDoctorSpecialtyUseCase";



let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;
let filterDoctorSpecialtyUseCase: FilterDoctorSpecialtyUseCase

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

describe("Filter Doctos by Specialty", () =>{
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

        filterDoctorSpecialtyUseCase = new FilterDoctorSpecialtyUseCase(
            doctorsRepositoryInMemory,
            specialtiesRepositoryInMemory
        )
    })

    it("should be able to list Doctors by Specialties", async() =>{
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
            specialties:["Alergologia", "Buco maxilo"]
        })

        const doctors = await filterDoctorSpecialtyUseCase.execute("Cardiologia");

        expect(doctors).toHaveLength(1);
    })


})