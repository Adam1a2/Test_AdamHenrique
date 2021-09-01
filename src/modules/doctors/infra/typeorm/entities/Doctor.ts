import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Cep } from "../../../../cep/infra/typeorm/entities/Cep";
import { Specialty } from "../../../../specialties/infra/typeorm/entities/specialty";


@Entity("doctors")
class Doctor{

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    crm: string;

    @Column()
    landline: string;

    @Column()
    cellPhone: string;

    @ManyToOne(() => Cep, cep => cep.doctors, {eager: true}) 
    cep: Cep;

    @ManyToMany(() => Specialty, specialty => specialty.doctors, {eager: true})
    @JoinTable({
      name: "doctors_specialties",
      joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' },
    })
    specialties: Specialty[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor() {
        if (!this.id) {
          this.id = uuidV4();
        }
    }
}

export { Doctor}