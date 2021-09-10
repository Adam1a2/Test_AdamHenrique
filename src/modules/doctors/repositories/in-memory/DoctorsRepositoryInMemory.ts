import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICreateDoctorDTO } from '@modules/doctors/dtos/ICreateDoctorDTO';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import { Specialty } from '@modules/specialties/infra/typeorm/entities/specialty';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';

class DoctorsRepositoryInMemory implements IDoctorsRepository {
  doctors: Doctor[] = [];

  async create({
    name,
    crm,
    cellPhone,
    landline,
    cep,
    specialties,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const createDoctor = new Doctor();

    Object.assign(createDoctor, {
      name,
      crm,
      cellPhone,
      landline,
      cep,
      specialties,
    });

    this.doctors.push(createDoctor);

    return createDoctor;
  }

  async update(doctor: Doctor): Promise<Doctor> {
    const doctorIndexFound = this.doctors.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.doctors[doctorIndexFound] = doctor;

    return this.doctors[doctorIndexFound];
  }

  async filterDoctors(
    name?: string,
    crm?: string,
    landline?: string,
    cellPhone?: string,
  ): Promise<Doctor[]> {
    const doctors = this.doctors.filter(doctor => {
      if (
        (name && doctor.name === name) ||
        (crm && doctor.crm === crm) ||
        (landline && doctor.landline === landline) ||
        (cellPhone && doctor.cellPhone === cellPhone)
      ) {
        return doctor;
      }
      return null;
    });

    return doctors;
  }

  async findById(id: string): Promise<Doctor> {
    const doctor = this.doctors.find(
      doctor => doctor.id === id && !doctor.deleted_at,
    );
    return doctor;
  }

  async findByCrm(crm: string): Promise<Doctor> {
    const doctor = this.doctors.find(
      doctor => doctor.crm === crm && !doctor.deleted_at,
    );
    return doctor;
  }

  async findByCellPhone(cellPhone: string): Promise<Doctor> {
    const doctor = this.doctors.find(
      doctor => doctor.cellPhone === cellPhone && !doctor.deleted_at,
    );
    return doctor;
  }

  async findByLandline(landline: string): Promise<Doctor> {
    const doctor = this.doctors.find(
      doctor => doctor.landline === landline && !doctor.deleted_at,
    );
    return doctor;
  }

  async list(): Promise<Doctor[]> {
    const all = this.doctors;
    return all;
  }

  async softDelete(doctor: Doctor): Promise<void> {
    const doctorIndexFound = this.doctors.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.doctors[doctorIndexFound].deleted_at = new Date();
  }

  async findDeleted(id: string): Promise<Doctor> {
    const doctorFound = this.doctors.find(
      findDoctor => findDoctor.id === id && findDoctor.deleted_at,
    );

    return doctorFound;
  }

  async recover(doctor: Doctor): Promise<Doctor> {
    const doctorIndexFound = this.doctors.findIndex(
      findDoctor => findDoctor.id === doctor.id,
    );

    this.doctors[doctorIndexFound].deleted_at = undefined;

    return this.doctors[doctorIndexFound];
  }

  async findByCep(cep: Cep): Promise<Doctor[]> {
    const doctorsFound = this.doctors.filter(
      filterDoctors =>
        filterDoctors.cep.cep === cep.cep && !filterDoctors.deleted_at,
    );

    return doctorsFound;
  }

  async findBySpecialty(specialty: Specialty): Promise<Doctor[]> {
    const doctorsFound = this.doctors.filter(filterDoctors =>
      filterDoctors.specialties.find(
        findSpecialty =>
          findSpecialty.name === specialty.name && !filterDoctors.deleted_at,
      ),
    );
    return doctorsFound;
  }
}

export { DoctorsRepositoryInMemory };
