import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { Specialty } from '@modules/specialties/infra/typeorm/entities/specialty';

interface ICreateDoctorDTO {
  name: string;

  crm: string;

  landline: string;

  cellPhone: string;

  cep: Cep;

  specialties: Specialty[];
}

export { ICreateDoctorDTO };
