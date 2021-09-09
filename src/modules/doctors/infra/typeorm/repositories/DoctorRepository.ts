import { getRepository, Repository } from 'typeorm';
import { Cep } from '@modules/cep/infra/typeorm/entities/Cep';
import { ICreateDoctorDTO } from '@modules/doctors/dtos/ICreateDoctorDTO';
import { IDoctorsRepository } from '@modules/doctors/repositories/IDoctorRepository';
import { Specialty } from '@modules/specialties/infra/typeorm/entities/specialty';
import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';

class DoctorRepository implements IDoctorsRepository {
  private repository: Repository<Doctor>;

  constructor() {
    this.repository = getRepository(Doctor);
  }

  async create({
    name,
    crm,
    landline,
    cellPhone,
    cep,
    specialties,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.repository.create({
      name,
      crm,
      landline,
      cellPhone,
      cep,
      specialties,
    });

    await this.repository.save(doctor);
    return doctor;
  }

  async update(doctor: Doctor): Promise<Doctor> {
    return await this.repository.save(doctor);
  }

  async findById(id: string): Promise<Doctor> {
    const doctor = await this.repository.findOne(id);
    return doctor;
  }

  async findByCrm(crm: string): Promise<Doctor> {
    const doctor = await this.repository.findOne({ crm });
    return doctor;
  }

  async findByCellPhone(cellPhone: string): Promise<Doctor> {
    const doctor = await this.repository.findOne({ cellPhone });
    return doctor;
  }

  async findByLandline(landline: string): Promise<Doctor> {
    const doctor = await this.repository.findOne({ landline });
    return doctor;
  }

  async list(): Promise<Doctor[]> {
    const doctors = await this.repository.find();
    return doctors;
  }

  async softDelete(doctor: Doctor): Promise<void> {
    await this.repository.softRemove(doctor);
  }

  async recover(doctor: Doctor): Promise<Doctor> {
    return await this.repository.recover(doctor);
  }

  async findDeleted(id: string): Promise<Doctor> {
    const doctorFound = await this.repository
      .createQueryBuilder(`doctors`)
      .where(`doctors.id = :id`, { id })
      .andWhere(`deleted_at IS NOT NULL`)
      .withDeleted()
      .getOne();

    return doctorFound;
  }

  async filterDoctors(
    name?: string,
    crm?: string,
    landline?: string,
    cellPhone?: string,
  ): Promise<Doctor[]> {
    const queryDoctors = await this.repository.createQueryBuilder('doctors');
    if (name) {
      queryDoctors.where('doctors.name = :name', { name });
    }

    if (crm) {
      queryDoctors.andWhere('doctors.crm = :crm', { crm });
    }

    if (landline) {
      queryDoctors.andWhere('doctors.landline = :landline', { landline });
    }

    if (cellPhone) {
      queryDoctors.andWhere('doctors.cellPhone = :cellPhone', { cellPhone });
    }

    const doctors = await queryDoctors.getMany();

    return doctors;
  }

  async findByCep(cep: Cep): Promise<Doctor[]> {
    const doctors = await this.repository.find({ cep });

    return doctors;
  }

  async findBySpecialty(specialty: Specialty): Promise<Doctor[]> {
    const doctors = await this.repository
      .createQueryBuilder('doctors')
      .leftJoinAndSelect('doctors.cep', 'cep')
      .leftJoinAndSelect('doctors.specialties', 'specialties')
      .where('specialties.name = :name', { name: specialty.name })
      .getMany();

    return doctors;
  }
}

export { DoctorRepository };
