import { Doctor } from '@modules/doctors/infra/typeorm/entities/Doctor';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('specialties')
class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => Doctor, doctor => doctor.specialties)
  doctors: Doctor[];

  @CreateDateColumn()
  created_at: Date;
}

export { Specialty };
