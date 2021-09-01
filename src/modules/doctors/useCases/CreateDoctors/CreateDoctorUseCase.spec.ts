import { CepProviderInMemory } from "../../../cep/providers/cepProvider/in-memory/CepProviderInMemory";
import { CepsRepositoryInMemory } from "../../../cep/repositories/in-memory/CepsRepositoryInMemory";
import { CreateCepUseCase } from "../../../cep/useCases/createCeps/CreateCepUseCase";
import { SpecialtiesRepositoryInMemory } from "../../../specialties/repositories/in-memory/SpecialtiesRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { DoctorsRepositoryInMemory } from "../../repositories/in-memory/DoctorsRepositoryInMemory";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";



let createDoctorUseCase: CreateDoctorUseCase;
let createCepUseCase: CreateCepUseCase;

let cepProviderInMemory: CepProviderInMemory;
let cepsRepositoryInMemory: CepsRepositoryInMemory;
let specialtiesRepositoryInMemory: SpecialtiesRepositoryInMemory;
let doctorsRepositoryInMemory: DoctorsRepositoryInMemory;

describe("Create Doctor", () => {
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
    })
    
    it('should not be able to create a new doctor with an already registered crm ', async () => {
        
        await createDoctorUseCase.execute({
            cellPhone: '31924245353',
            cep: '35172240',
            crm: '1234567',
            name: 'test',
            landline: '40028922',
            specialties: ['Cardiologia', 'Buco maxilo'],
          });

          await expect(
              createDoctorUseCase.execute({
              cellPhone: "31940400404",
              cep: "60331400",
              crm: "1234567",
              name: "test",
              landline: '38460608',
              specialties: ['Cardiologia', 'Buco maxilo'],
            }),
          ).rejects.toBeInstanceOf(AppError);
      });

    it('should not be able to create a new doctor with an already registered landline ', async () => {
        
      await createDoctorUseCase.execute({
          cellPhone: '31924245353',
          cep: '35172240',
          crm: '1234567',
          name: 'test',
          landline: '40028922',
          specialties: ['Cardiologia', 'Buco maxilo'],
        });
        
        await expect(
            createDoctorUseCase.execute({
            cellPhone: "31940400404",
            cep: "60331400",
            crm: "1244567",
            name: "test",
            landline: '40028922',
            specialties: ['Cardiologia', 'Buco maxilo'],
          }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new doctor with an already registered cellPhone ', async () => {
        
      await createDoctorUseCase.execute({
          cellPhone: '31924245353',
          cep: '35172240',
          crm: '1234567',
          name: 'test',
          landline: '40028922',
          specialties: ['Cardiologia', 'Buco maxilo'],
        });
        
        await expect(
            createDoctorUseCase.execute({
            cellPhone: "31924245353",
            cep: "60331400",
            crm: "1244567",
            name: "test",
            landline: '40088922',
            specialties: ['Cardiologia', 'Buco maxilo'],
          }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new doctor with just one specialty', async () => {

        await expect(
            createDoctorUseCase.execute({
            cellPhone: "31940400404",
            cep: "60331400",
            crm: "1244567",
            name: "test",
            landline: '38460608',
            specialties: ['Cardiologia'],
          }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new doctor with an unregistered specialty ', async () => {

      await expect(
          createDoctorUseCase.execute({
          cellPhone: "31940400404",
          cep: "60331400",
          crm: "1244567",
          name: "test",
          landline: '38460608',
          specialties: ['Cardiologia', "Clínico Geral"],
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

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
})