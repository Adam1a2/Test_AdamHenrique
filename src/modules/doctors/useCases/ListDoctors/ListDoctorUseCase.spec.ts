import { ListDoctorUseCase } from "./ListDoctorUseCase";
import { CepProviderInMemory } from "../../../cep/providers/cepProvider/in-memory/CepProviderInMemory";
import { CepsRepositoryInMemory } from "../../../cep/repositories/in-memory/CepsRepositoryInMemory";
import { CreateCepUseCase } from "../../../cep/useCases/createCeps/CreateCepUseCase";
import { SpecialtiesRepositoryInMemory } from "../../../specialties/repositories/in-memory/SpecialtiesRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { DoctorsRepositoryInMemory } from "../../repositories/in-memory/DoctorsRepositoryInMemory";
import { CreateDoctorUseCase } from "../CreateDoctors/CreateDoctorUseCase";


let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

let listDoctorUseCase: ListDoctorUseCase;


describe("List Doctors", () => {
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

        listDoctorUseCase = new ListDoctorUseCase(doctorsRepositoryInMemory)
    })

    it("should be able to list all Doctors", async() =>{
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

        const doctors = await listDoctorUseCase.execute();

        expect(doctors).toHaveLength(2);
    })
})