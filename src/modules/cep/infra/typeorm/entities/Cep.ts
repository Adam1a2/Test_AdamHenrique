import { v4 as uuidV4} from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "../../../../doctors/infra/typeorm/entities/Doctor";



@Entity("ceps")
class Cep{
    @PrimaryColumn()
    id?: string;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    complement: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    ibge: string;

    @Column()
    gia: string;

    @Column()
    ddd: string;

    @Column()
    siafi: string;

    @OneToMany(() => Doctor, doctor => doctor.cep)
    doctors: Doctor[]

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
          this.id = uuidV4();
        }
    }

}

export { Cep };