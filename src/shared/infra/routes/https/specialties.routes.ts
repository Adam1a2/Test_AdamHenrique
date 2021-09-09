import { CreateSpecialtyController } from '@modules/specialties/useCases/createSpecialties/CreateSpecialtyController';
import { ListSpecialtyController } from '@modules/specialties/useCases/listSpecialties/ListSpecialtyController';
import { Router } from 'express';

const specialtiesRoutes = Router();

const createSpecialtyController = new CreateSpecialtyController();
const listSpecialtyController = new ListSpecialtyController();

specialtiesRoutes.post('/', createSpecialtyController.handle);

specialtiesRoutes.get('/', listSpecialtyController.handle);

export { specialtiesRoutes };
