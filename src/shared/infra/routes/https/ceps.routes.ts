import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { CreateCepController } from "../../../../modules/cep/useCases/createCeps/CreateCepController";
import { ListCepController } from "../../../../modules/cep/useCases/listCeps/ListCepController";


const cepsRoutes = Router();

const createCepController = new CreateCepController();
const listCepController = new ListCepController();


cepsRoutes.post("/", celebrate({
    [Segments.BODY]: {
        cep: Joi.string()
          .regex(/^([\d]{8})$/)
          .required(),
    }
}), createCepController.handle);

cepsRoutes.get("/", listCepController.handle)



export { cepsRoutes };
