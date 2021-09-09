import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CreateDoctorController } from '@modules/doctors/useCases/CreateDoctors/CreateDoctorController';
import { DeleteDoctorController } from '@modules/doctors/useCases/deleteDoctors/DeleteDoctorController';
import { FilterDoctorController } from '@modules/doctors/useCases/FilterDoctors/FilterDoctorController';
import { FilterDoctorCepController } from '@modules/doctors/useCases/FilterDoctorsCep/FilterDoctorCepController';
import { FilterDoctorSpecialtyController } from '@modules/doctors/useCases/FilterDoctosSpecialties/FilterDoctorSpecialtyController';
import { ListDoctorController } from '@modules/doctors/useCases/ListDoctors/ListDoctorController';
import { RecoverDoctorController } from '@modules/doctors/useCases/recoverDoctors/RecoverDoctorController';
import { UpdateDoctorController } from '@modules/doctors/useCases/updateDoctors/UpdateDoctorController';

const doctorRoutes = Router();

const createDoctorController = new CreateDoctorController();
const listDoctorController = new ListDoctorController();
const deleteDoctorController = new DeleteDoctorController();
const updateDoctorController = new UpdateDoctorController();
const recoverDoctorController = new RecoverDoctorController();
const filterDoctorController = new FilterDoctorController();
const filterDoctorCepController = new FilterDoctorCepController();
const filterDoctorSpecialtyController = new FilterDoctorSpecialtyController();

doctorRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(120).required(),
      crm: Joi.string().regex(RegExp('^\\d{7}$')).required(),
      landline: Joi.string().regex(RegExp('^\\d{8}$')).required(),
      cellPhone: Joi.string().regex(RegExp('^\\d{11}$')).required(),
      cep: Joi.string().regex(RegExp('^\\d{8}$')).required(),
      specialties: Joi.array().items(Joi.string()).min(2).required(),
    },
  }),
  createDoctorController.handle,
);

doctorRoutes.get('/', listDoctorController.handle);

doctorRoutes.delete('/delete/:id', deleteDoctorController.handle);

doctorRoutes.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(120),
      crm: Joi.string().regex(RegExp('^\\d{7}$')),
      landline: Joi.string().regex(RegExp('^\\d{8}$')),
      cellPhone: Joi.string().regex(RegExp('^\\d{11}$')),
      cep: Joi.string().regex(RegExp('^\\d{8}$')),
      specialties: Joi.array().items(Joi.string()).min(2),
    },
  }),
  updateDoctorController.handle,
);

doctorRoutes.get('/recover/:id', recoverDoctorController.handle);

doctorRoutes.get(
  '/select/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().max(120),
      crm: Joi.string().regex(RegExp('^\\d{7}$')),
      landline: Joi.string().regex(RegExp('^\\d{8}$')),
      cellPhone: Joi.string().regex(RegExp('^\\d{11}$')),
    },
  }),
  filterDoctorController.handle,
);

doctorRoutes.get(
  '/ceps/:cep',
  celebrate({
    [Segments.PARAMS]: {
      cep: Joi.string()
        .regex(/^([\d]{8})$/)
        .required(),
    },
  }),
  filterDoctorCepController.handle,
);

doctorRoutes.get(
  '/specialty/:specialty',
  filterDoctorSpecialtyController.handle,
);

export { doctorRoutes };
