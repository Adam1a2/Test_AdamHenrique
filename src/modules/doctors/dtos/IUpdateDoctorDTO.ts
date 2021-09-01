interface IDoctorUpdateDTO{

    id: string;

    name?: string;

    crm?: string;

    landline?: string;

    cellPhone?: string;

    cep?: string;

    specialties?: string[];
}

export {IDoctorUpdateDTO }