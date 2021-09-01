import { Cep } from "../../cep/infra/typeorm/entities/Cep";
import { Specialty } from "../../specialties/infra/typeorm/entities/specialty";

interface ICreateDoctorDTO{
    name: string;

    crm: string;

    landline: string;

    cellPhone: string;

    cep: Cep;

    specialties: Specialty[];
}

export { ICreateDoctorDTO }