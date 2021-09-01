import { Doctor } from "../../doctors/infra/typeorm/entities/Doctor";

interface ICreateSpecialtyDTO {
    id?: string;

    name: string;

  }
  
  export { ICreateSpecialtyDTO };