import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { Specialty } from '@modules/specialties/infra/typeorm/entities/specialty';
import { ICreateDoctorDTO } from '../dtos/ICreateDoctorDTO';
import { Doctor } from '../infra/typeorm/entities/Doctor';

interface IDoctorsRepository {
  create(doctor: ICreateDoctorDTO): Promise<Doctor>;
  update(doctor: Doctor): Promise<Doctor>;
  findById(id: string): Promise<Doctor>;
  findByCrm(crm: string): Promise<Doctor>;
  findByCellPhone(cellPhone: string): Promise<Doctor>;
  findByLandline(landline: string): Promise<Doctor>;
  list(): Promise<Doctor[]>;
  softDelete(doctor: Doctor): Promise<void>;
  findDeleted(id: string): Promise<Doctor>;
  recover(doctor: Doctor): Promise<Doctor>;
  filterDoctors(
    name?: string,
    crm?: string,
    landline?: string,
    cellPhone?: string,
  ): Promise<Doctor[]>;
  findByCep(cep: Cep): Promise<Doctor[]>;
  findBySpecialty(specialty: Specialty): Promise<Doctor[]>;
}

export { IDoctorsRepository };
