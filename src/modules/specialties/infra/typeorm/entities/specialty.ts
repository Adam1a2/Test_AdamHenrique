import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Doctor } from "../../../../doctors/infra/typeorm/entities/Doctor";

@Entity("specialties")
class Specialty {
  
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => Doctor, doctor => doctor.specialties)
  doctors: Doctor[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specialty };
