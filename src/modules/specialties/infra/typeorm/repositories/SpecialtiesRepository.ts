import { Specialty } from "../entities/specialty"

import { getRepository, In, Repository } from "typeorm";
import { ISpecialtiesRepository } from "../../../repositories/ISpecialtiesRepository";


class SpecialtiesRepository implements ISpecialtiesRepository{
    private repository: Repository<Specialty>;
    
    constructor(){
        this.repository = getRepository(Specialty);
    }
    
    async create(name: string):Promise<void>{
        
        const specialty = this.repository.create({
            name
        })

        this.repository.save(specialty)
    }

    async list(): Promise<Specialty[]> {
        const specialtys = await this.repository.find();
        return specialtys;
    }

    async findByName(name: string): Promise<Specialty | undefined>{
        const specialty = await this.repository.findOne({name});
        return specialty;
    }

    async findById(id: string): Promise<Specialty | undefined> {
        const specialty = await this.repository.findOne({id});
        return specialty;
    }

    async findSpecialties(specialties: string[]): Promise<Specialty[]> {
        const Checkspecialties = await this.repository.find({
            where: { name: In(specialties)}
        })
        
        return Checkspecialties;
    }
    
}




export {SpecialtiesRepository}